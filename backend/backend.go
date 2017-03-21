package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
	"math/rand"
)

var users map[int]*userInfo

type message struct {
	Hello string
}

type pairInfo struct {
	user1 *userInfo
	user2 *userInfo
}

type userInfo struct {
	id int
	socket *websocket.Conn
	ch chan string
	pair *pairInfo
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

	//In this function, id1 is the one that requested pairing
func makePair(user1 *userInfo, id2 int) {
	var user2 = users[id2]
	if user2 == nil {
		return
	}
	if user2.pair != nil {
		return
	}
	var pair = &pairInfo{user1, user2}
	user1.pair = pair
	user2.pair = pair
	go pairLoop(pair)
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
		user = &userInfo{id: id, pair: nil, socket: c, ch: make(chan string)}
		users[id] = user
	}
	defer c.Close()
	for {
		if (user.pair != nil) {
			var t, m, err = c.ReadMessage()
			if err != nil {
				fmt.Println("WTF")
				fmt.Println(err)
				continue
			}
			if t != websocket.TextMessage {
				fmt.Println("Not a text message.")
				continue
			}
			user.ch <- string(m)
			continue
		}
		var j = make(map[string]interface{})
		var err = c.ReadJSON(&j)
		if err != nil {
			fmt.Println("WTF is happening")
			fmt.Println(err)
			break
		}
		var messageType, ok = j["messageType"].(string)
		if !ok {
			continue
		}
		switch(messageType) {
		case "pairRequest":
			var partnerId, ok = j["partnerId"].(float64)
			if !ok {
				fmt.Println("Not okay")
				continue
			}
			makePair(user, int(partnerId))
			if user.pair == nil {
				var msg = make(map[string]interface{})
				msg["messageType"] = "connectionUnsuccessful"
				msg["id"] = partnerId
				user.socket.WriteJSON(msg)
			}
		}
	}
}

func pairLoop(pair *pairInfo) {
	//TODO: Send a message to both users saying that they have connected
	//var msg1 = interface{"messageType": "connection", "id": pair.user2.id}
	//var msg2 = interface{"messageType": "connection", "id": pair.user1.id}
	var msg1 = make(map[string]interface{})
	var msg2 = make(map[string]interface{})
	msg1["messageType"] = "connection"
	msg2["messageType"] = "connection"

	msg1["id"] = pair.user2.id
	msg2["id"] = pair.user1.id

	pair.user1.socket.WriteJSON(msg1)
	pair.user2.socket.WriteJSON(msg2)
	for {
		var str = ""
		select {
		case str = <- pair.user1.ch:
			pair.user2.socket.WriteMessage(websocket.TextMessage, []byte(str))
		case str = <- pair.user2.ch:
			pair.user1.socket.WriteMessage(websocket.TextMessage, []byte(str))
		}
	}
}

func main() {
	users = make(map[int]*userInfo)

	fmt.Println("starting server")
	http.HandleFunc("/pair", onConnect)
	http.ListenAndServe(":8000", nil)
}
