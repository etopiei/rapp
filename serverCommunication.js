var socket = new WebSocket("ws://127.0.0.1:8000/pair");

socket.onopen = () => {console.log("You're now connected.");}
socket.onmessage = (message) => {handleMessage(message)}
socket.onerror = () => {console.log("Something bad happened...");}
socket.onclose = (close) => {console.log("The socket was closed", (close.wasClean ? "cleanly" : "uncleanly"), "with code", close.code);}

var userId = null;

var partnerIdInput = document.getElementById("partner-id-input");
partnerIdInput.onkeypress = e => {
	if (e.keyCode == 13) {
		sendPairRequest();
	}
}

function sendPairRequest() {
	let id = partnerIdInput.value;

	//a little easter egg
	if (id === '01189998819991197253') {
		alert("You legend!");
	}

	let messageObject = {
		messageType: "pairRequest",
		partnerId: id,
		isDriver: true
	};
	socket.send(JSON.stringify(messageObject));
}

function onPairStart(msgObject) {
	//This ensures that the loop on the server
	//for when the user isn't paired is broken
	socket.send("{}");
	if (msgObject.role === 'driver') {
		editor.on("change", (instance, changeObj) => {
			messageObject = {
				messageType: "change",
				changeObj: changeObj
			};
			
			socket.send(JSON.stringify(messageObject));
		});
		addChange = function() {return};
	} else if (msgObject.role === 'observer') {
		editor.on("beforeChange", (instance, changeObj) => {
			//cancel changes made by the observer
			if (changeObj.from.src !== 'outside') {
				changeObj.cancel()
			}
		});
	}
}

function handleMessage(message) {
	let msgObject = JSON.parse(message.data);
	switch (msgObject.messageType) {
	case "id":
		userId = msgObject.id;
		document.getElementById("user-id").innerText = userId;
		break;

	case "connection":
		onPairStart(msgObject);
		break;
	
	case "chatMessage":
		if (msgObject.senderId === userId) {
			displayMessage(msgObject.chatMessage, "You");
		} else {
			displayMessage(msgObject.chatMessage, "Partner");
		}

		break;
		
	case "change":
		if (typeof msgObject.changeObj === "object") {
			addChange(msgObject.changeObj);
		}
		break;

	case "changeLanguage":
		if (typeof msgObject.langueage == "string") {
			onChangeLanguage(msgObject.language);
		}
		break;
	}
}

function addChange(changeObj) {
	
	//Dirty hack to distinguish between changes added by the observer and driver,
	//so that changes made by the observer can be cancelled.
	changeObj.from.src = "outside";
	editor.replaceRange(changeObj.text, changeObj.from, changeObj.to);
}

function sendMessage(message) {
	messageObject = {
		messageType: "chatMessage",
		chatMessage: message
	}
	socket.send(JSON.stringify(messageObject));
}

editor.on("change", (instance, changeObj) => {

	//BELOW CODE ISN'T FOR SERVER COMMUNICATION
	//IT IS FOR CLIENT SIDE STORGAE FOR FUTURE SESSIONS

	let textContent = editor.getValue();

	//Do we really need to do this every time the user makes a change?
	//Maybe it would be better to do it at an interval
    fileStorage(textContent);
});

function fileStorage(textContent) {

    //SET FILE CONTENTS IN STORAGE FOR LATER OR IF DISCONNECT

     if (typeof(Storage) !== "undefined") {
    
        //store the theme in the local browser storage

        localStorage.setItem("code", textContent);


    } else {

        // No Web Storage support - too bad for user
	// TODO: take this alert out. It's here just to see if anyone notices it.
	alert("Haha, you don't support Web Storage. Get a modern browser")

    }
}

//socket.changeLanguage(mode : string - the language to change to)
socket.changeLanguage = function(mode) {
	if (!mode) {
		return;
	}
	let msg = {
		messageType: "changeLanguage",
		language: mode
	};
	socket.send(JSON.stringify(msg));
}
