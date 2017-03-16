package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

type message struct {
	Hello string
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func pairConnect(w http.ResponseWriter, req *http.Request) {
	var c, err = upgrader.Upgrade(w, req, nil)
	if err != nil {
		fmt.Println("Upgrade: ", err)
		return
	}
	defer c.Close()
	for {
		var j = make(map[string]interface{})
		var err = c.ReadJSON(&j)
		if err != nil {
			fmt.Println(err)
		}
		var c = j["text"].([]interface{})[0].(string)
		fmt.Printf("%s", c)
	}
}

func main() {
	fmt.Println("starting server")
	http.HandleFunc("/pair", pairConnect)
	http.ListenAndServe(":8000", nil)
}
