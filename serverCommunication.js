var socket = new WebSocket("wss://127.0.0.1:8000/pair");

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

	//set the pair button to go away and show the call and switch buttons.

	document.getElementById('pair-button').display = 'none';
	document.getElementById('call-button').display = '';
	document.getElementById('switch-button').display = '';

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

var offerOptions = {
	offerToReceiveAudio: 1,
	offerToReceiveVideo: 0,
	voiceActivityDetection: false
};

var pc = null;

function handleMessage(message) {
	let msgObject = JSON.parse(message.data);
	console.log(msgObject);
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

	case "icecandidate":
		if (!pc) {
			pc = new RTCPeerConnection();
		}
		if (msgObject.icecandidate)
			pc.addIceCandidate(new RTCIceCandidate(msgObject.icecandidate));
		break;
	
	case "startCall":
		handleCall(msgObject);
		break;

	default:
		console.log(msgObject);
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
}

function handleCall(msgObject) {
	console.log("I got called.")
	if (!pc)
		pc = new RTCPeerConnection();
	pc.setRemoteDescription(new RTCSessionDescription(msgObject.desc));
	startCall(false);
}

function hangup() {
	document.getElementById('call-button').style.display = 'table-cell';
	document.getElementById('hang-up-button').style.display = 'none';
	if (pc) {
		pc.removeStream(stream);
		pc.close();
		pc = null;
	}

	if (stream) {
		console.log(stream.getTracks())
		stream.getTracks().forEach(track => {
			stream.removeTrack(track);
			track.stop();
		});
		stream = null;
	}
}

function startCall(myCall) {
	if (myCall) {
		pc = new RTCPeerConnection();
	}

	document.getElementById('call-button').style.display = 'none';
	document.getElementById('hang-up-button').style.display = 'table-cell';

	if (pc.remoteDescription.type === "answer")
		return

	pc.onicecandidate = e => {
		console.log("onicecandidate")
		let msg = {
			messageType: "icecandidate",
			icecandidate: e.candidate
		}
		socket.send(JSON.stringify(msg))
	};

	pc.onclose = e => {
		console.log("close")
	}

	pc.ontrack = e => {
		console.log("onaddstream")
		let sound = document.getElementById('sound');
		sound.srcObject = e.streams[0];
	};

	pc.onremovestream = stream => {hangup();};

	pc.onaddstream = e => {
		console.log("onaddstream")
		let sound = document.getElementById('sound');
		sound.srcObject = e.stream;
	};

	mediaPromise = navigator.mediaDevices.getUserMedia({
		audio: true,
		video: false
	});

	mediaPromise.then(stream => {
		console.log("mediaPromise")
		window.stream = stream;
		pc.addStream(stream);
		if (myCall) {
			console.log("myCall")
			pc.createOffer(offerOptions).then(onDescription);
		} else {
			console.log("not myCall")
			if (pc.remoteDescription.type === "offer")
				pc.createAnswer().then(onDescription);
		}
	});
}

function onDescription(desc) {
	console.log("onDescription")
	pc.setLocalDescription(desc);
	let msg = {
		messageType: "startCall",
		desc: desc
	};
	socket.send(JSON.stringify(msg));
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
