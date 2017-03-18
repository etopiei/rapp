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
	for users[id] == nil {
		id = rand.Int()
	}
	var user = &userInfo{id: id, pair: nil, socket: c, ch: make(chan string)}
	users[id] = user

	defer c.Close()
	for {
		if (user.pair != nil) {
				//This is temporary until I can read the websocket documentation
				//and figure out how to read a string from the socket

				//WARNING: DO NOT RUN THIS UNTIL IT'S FIXED
			var s = "hi"
			user.ch <- s
			continue
		}
		var j = make(map[string]interface{})
		var err = c.ReadJSON(&j)
		if err != nil {
			fmt.Println(err)
			break
		}
		var c = j["text"].([]interface{})[0].(string)
		var messageType, ok = j["messageType"].(string)
		if !ok {
			continue
		}
		switch(messageType) {
		case "pairRequest":
			var partnerId, ok = j["partnerId"].(int)
			if !ok {
				continue
			}
			makePair(user.id, partnerId)
			if user.pair == nil {
				//TODO: write to the socket a message saying connection was unsuccessful
			}
		}
		fmt.Printf("%s", c)
	}
}

func pairLoop(pair *pairInfo) {
	//TODO: Send a message to both users saying that they have connected
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
