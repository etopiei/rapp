var socket = new WebSocket("ws://127.0.0.1:8000/pair");

socket.onopen = () => {console.log("You're now connected.");}
socket.onmessage = (message) => {console.log(message.data);}
socket.onerror = () => {console.log("Something bad happened...");}
socket.onclose = (close) => {console.log("The socket was closed", (close.wasClean ? "cleanly" : "uncleanly"), "with code", close.code);}

editor.on("change", (instance, changeObj) => {
	socket.send(JSON.stringify(changeObj));	
	console.log(changeObj);
});
