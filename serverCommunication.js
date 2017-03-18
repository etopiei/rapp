var socket = new WebSocket("ws://127.0.0.1:8000/pair");

socket.onopen = () => {console.log("You're now connected.");}
socket.onmessage = (message) => {console.log(message.data);}
socket.onerror = () => {console.log("Something bad happened...");}
socket.onclose = (close) => {console.log("The socket was closed", (close.wasClean ? "cleanly" : "uncleanly"), "with code", close.code);}

editor.on("change", (instance, changeObj) => {
	socket.send(JSON.stringify(changeObj));	
	console.log(changeObj);

	//BELOW CODE ISN'T FOR SERVER COMMUNICATION
	//IT IS FOR CLIENT SIDE STORGAE FOR FUTURE SESSIONS

	var textContent = editor.getValue();
    fileStorage(textContent);
});

function fileStorage(textContent) {

    //SET FILE CONTENTS IN STORAGE FOR LATER OR IF DISCONNECT

     if (typeof(Storage) !== "undefined") {
    
        //store the theme in the local browser storage

        localStorage.setItem("code", textContent);


    } else {

        // No Web Storage support - too bad for user

    }

}