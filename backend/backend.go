package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
	"math/rand"
	"encoding/json"
	"strconv"
)

var users map[int]*userInfo

type message struct {
	Hello string
}

type pairInfo struct {
	driver *userInfo
	observer *userInfo
}

type userInfo struct {
	id int
	socket *websocket.Conn
	ch chan []byte
	pair *pairInfo
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

	//In this function, id1 is the one that requested pairing
func makePair(user1 *userInfo, id2 int, user1Driver bool) {
	var user2 = users[id2]
	if user2 == nil {
		fmt.Println("nil user")
		return
	}
	if user2.pair != nil {
		fmt.Println("already paired")
		return
	}

	if user1 != user2 {
		go pairLoop(pair)
	}

	var pair *pairInfo
	if user1Driver {
		pair = &pairInfo{driver: user1, observer: user2}
	} else {
		pair = &pairInfo{driver: user2, observer: user1}
	}
	user1.pair = pair
	user2.pair = pair
}

func handleNonPairMessage(u *userInfo) error {
	var j = make(map[string]interface{})
	var err = u.socket.ReadJSON(&j)
	if err != nil {
		return err
	}
	var messageType, ok = j["messageType"].(string)
	if !ok {
		return nil
	}
	switch(messageType) {
	case "pairRequest":
		var tmp, ok = j["partnerId"].(string)
		if !ok {
			fmt.Println("Not okay 71")
			return nil
		}
		var partnerId, err = strconv.Atoi(tmp)
		if err != nil {
			fmt.Println("Not okay 79")
			return nil
		}

		var isDriver, ok2 = j["isDriver"].(bool)
		if !ok2 {
			fmt.Println("Not okay 77")
			return nil
		}
		makePair(u, partnerId, isDriver)
		if u.pair == nil {
			var msg = make(map[string]interface{})
			msg["messageType"] = "connectionUnsuccessful"
			msg["id"] = partnerId
			u.socket.WriteJSON(msg)
		}
	}
	return nil
}

func sendToPairChannel(u *userInfo) error {
	var t, m, err = u.socket.ReadMessage()
	if err != nil {
		return err
	}
	if t != websocket.TextMessage {
		fmt.Println("Not a text message.")
		return nil
	}
	u.ch <- m
	return nil
}

func write(w http.ResponseWriter, req *http.Request) {
	if req.RequestURI[0] == '/' {
		req.RequestURI = req.RequestURI[1:]
	}
	http.ServeFile(w, req, req.RequestURI)
}

func onConnect(w http.ResponseWriter, req *http.Request) {
	var c, err = upgrader.Upgrade(w, req, nil)
	if err != nil {
		fmt.Println("Upgrade: ", err)
		return
	}

	var id = rand.Int()
	var user *userInfo
	for users[id] != nil {
		id = rand.Int()
	}

	user = &userInfo{id: id, pair: nil, socket: c, ch: make(chan []byte)}
	users[id] = user

	var msg = make(map[string]interface{})
	msg["messageType"] = "id"
	fmt.Println(strconv.Itoa(id))
	msg["id"] = strconv.Itoa(id)
	user.socket.WriteJSON(msg);
	defer c.Close()
	for {
		if (user.pair != nil) {
			var err = sendToPairChannel(user)
			if err != nil {
				users[user.id] = nil
				break
			}
			continue
		}
		var err = handleNonPairMessage(user)
		if err != nil {
			users[user.id] = nil
			break
		}
	}
}


func writeConfirmationMessage(pair *pairInfo) {
	var msgDriver = make(map[string]interface{})
	var msgObserver = make(map[string]interface{})
	msgDriver["messageType"] = "connection"
	msgObserver["messageType"] = "connection"

	msgDriver["id"] = pair.observer.id
	msgDriver["role"] = "driver"
	msgObserver["id"] = pair.driver.id
	msgObserver["role"] = "observer"

	pair.driver.socket.WriteJSON(msgDriver)
	pair.observer.socket.WriteJSON(msgObserver)
}


func pairLoop(pair *pairInfo) {
	writeConfirmationMessage(pair)
	for {
		var msg []byte
		select {
		case msg = <- pair.driver.ch:
			var j map[string]interface{}
			json.Unmarshal(msg, &j)
			var messageType, ok = j["messageType"].(string)
			if !ok {
				continue
			}
			switch(messageType) {
			case "chatMessage":
				var chatMessage, ok = j["chatMessage"].(string)
				if !ok {
					continue
				}
				var outMsg = make(map[string]interface{})
				outMsg["senderId"] = strconv.Itoa(pair.driver.id)
				outMsg["messageType"] = "chatMessage"
				outMsg["chatMessage"] = chatMessage
				pair.driver.socket.WriteJSON(outMsg)
				pair.observer.socket.WriteJSON(outMsg)

			case "relinquishControl":
				fmt.Println("control is gone")
				pair.driver, pair.observer = pair.observer, pair.driver
				var msgDriver = make(map[string]interface{})
				var msgObserver = make(map[string]interface{})
				msgDriver["messageType"] = "role"
				msgObserver["messageType"] = "role"

				msgDriver["id"] = pair.observer.id
				msgDriver["role"] = "driver"
				msgObserver["id"] = pair.driver.id
				msgObserver["role"] = "observer"

				pair.driver.socket.WriteJSON(msgDriver)
				pair.observer.socket.WriteJSON(msgObserver)

			default:
				pair.observer.socket.WriteMessage(websocket.TextMessage, msg)
			}
		case msg = <- pair.observer.ch:
			var j map[string]interface{}
			json.Unmarshal(msg, &j)
			var messageType, ok = j["messageType"].(string)
			if !ok {
				continue
			}
			switch(messageType) {
			case "chatMessage":
				var chatMessage, ok = j["chatMessage"].(string)
				if !ok {
					continue
				}
				var outMsg = make(map[string]interface{})
				outMsg["senderId"] = strconv.Itoa(pair.observer.id)
				outMsg["messageType"] = "chatMessage"
				outMsg["chatMessage"] = chatMessage
				pair.driver.socket.WriteJSON(outMsg)
				pair.observer.socket.WriteJSON(outMsg)

			default:
				pair.driver.socket.WriteMessage(websocket.TextMessage, msg)
			}
		}
	}
}

func main() {
	users = make(map[int]*userInfo)

	fmt.Println("starting server")
	http.HandleFunc("/pair", onConnect)
	http.HandleFunc("/", write)
	http.ListenAndServeTLS(":8000", "../cert.pem", "../key.pem", nil)
}
