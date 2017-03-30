package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
	"math/rand"
	"encoding/json"
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
		return
	}
	if user2.pair != nil {
		return
	}
	var pair *pairInfo
	if user1Driver {
		pair = &pairInfo{driver: user1, observer: user2}
	} else {
		pair = &pairInfo{driver: user2, observer: user1}
	}
	user1.pair = pair
	user2.pair = pair
	go pairLoop(pair)
}

func handleNonPairMessage(u *userInfo) {
	var j = make(map[string]interface{})
	var err = u.socket.ReadJSON(&j)
	if err != nil {
		fmt.Println("WTF is happening")
		fmt.Println(err)
		return
	}
	var messageType, ok = j["messageType"].(string)
	if !ok {
		return
	}
	switch(messageType) {
	case "pairRequest":
		var tmp, ok = j["partnerId"].(float64)
		if !ok {
			fmt.Println("Not okay")
			return
		}
		var partnerId = int(tmp)
		var isDriver, ok2 = j["isDriver"].(bool)
		if !ok2 {
			fmt.Println("Not okay")
			return
		}
		makePair(u, partnerId, isDriver)
		if u.pair == nil {
			var msg = make(map[string]interface{})
			msg["messageType"] = "connectionUnsuccessful"
			msg["id"] = partnerId
			u.socket.WriteJSON(msg)
		}
	}
}

func sendToPairChannel(u *userInfo) {
	var t, m, err = u.socket.ReadMessage()
	if err != nil {
		fmt.Println("WTF")
		fmt.Println(err)
		return
	}
	if t != websocket.TextMessage {
		fmt.Println("Not a text message.")
		return
	}
	u.ch <- m
}


func onConnect(w http.ResponseWriter, req *http.Request) {
	var c, err = upgrader.Upgrade(w, req, nil)
	if err != nil {
		fmt.Println("Upgrade: ", err)
		return
	}

	var id = 0
	var user *userInfo
	for users[id] == nil {
		id = rand.Int()
		user = &userInfo{id: id, pair: nil, socket: c, ch: make(chan []byte)}
		users[id] = user
	}
	defer c.Close()
	for {
		if (user.pair != nil) {
			sendToPairChannel(user)
			continue
		}
		handleNonPairMessage(user)
	}
}


func writeConfirmationMessage(pair *pairInfo) {
	var msgDriver = make(map[string]interface{})
	var msgObserver = make(map[string]interface{})
	msgDriver["messageType"] = "connection"
	msgObserver["messageType"] = "connection"

	msgDriver["id"] = pair.observer.id
	msgObserver["id"] = pair.driver.id

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
				outMsg["senderId"] = pair.driver.id
				outMsg["messageType"] = "chatMessage"
				outMsg["chatMessage"] = chatMessage
				pair.driver.socket.WriteJSON(outMsg)
				pair.observer.socket.WriteJSON(outMsg)
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
				outMsg["senderId"] = pair.driver.id
				outMsg["messageType"] = "chatMessage"
				outMsg["chatMessage"] = chatMessage
				pair.driver.socket.WriteJSON(outMsg)
				pair.observer.socket.WriteJSON(outMsg)
			}
		}
	}
}

func main() {
	users = make(map[int]*userInfo)

	fmt.Println("starting server")
	http.HandleFunc("/pair", onConnect)
	http.ListenAndServe(":8000", nil)
}
