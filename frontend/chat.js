document.getElementById('chat-text').onkeypress = function(e) {

	if (!e) e = window.event;
	var keyCode = e.keyCode || e.whichl
	if (keyCode == '13') {
		submitChatText();
	}

}

function submitChatText(){

	var chatBox = document.getElementById('chat-text');

	var message = chatBox.value;

	if (message == "") {
		return;
	}

	sendMessage(message);

	//clear chat box
	chatBox.value = "";

}

function displayFullscreenMessage(textToDisplay) {
	numberOfMessages = document.getElementById('chat-notification').children[0].innerText;

	if (numberOfMessages > 0) {
		numberOfMessages++;
		document.getElementById('chat-notification').children[0].innerText = numberOfMessages;
	} else {

		document.getElementById('chat-notification').children[0].innerText = "1";

		var y = document.getElementById('chat-notification');
		y.style.display = 'block';
		y.style.bottom = '10';
		y.style.right = '10';
		y.style.height = '40px';
		y.style.width = '40px';

	}

	var newMessage = document.createElement('p');
	if (textToDisplay.length > 40) {
		newMessage.innerText = textToDisplay.slice(0,37) + "...";
	}
	else {
		newMessage.innerText = textToDisplay;
	}
	newMessage.className = 'float';

	var q = document.getElementById('chat-small');
	q.appendChild(newMessage);

	setTimeout(function(){
		q.removeChild(newMessage);
	}, 8000);
}

function displayMessage(messageText, username) {

	if (username == undefined) {
		username = "Guest"
	}

	textToDisplay = username + ": " + messageText;

	let p = document.createElement('p');
	p.innerText = textToDisplay;

	let display = document.getElementById('messages-display');
	display.appendChild(p);
	let par = display.parentElement;
	par.scrollTop = par.scrollHeight - par.offsetHeight;

	if (document.getElementById('chat-area').style.display == 'none') {
		displayFullscreenMessage(textToDisplay);
	}
}
