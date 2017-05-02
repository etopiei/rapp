var popup = document.getElementById("start-pair-popup")
var dimmer = document.getElementById("background-dimmer")

function checkForPairID() {
	let id = getParameterByName('id');
	if (id == null){
		displayPairPopup();
	} else {
		sendPairRequest(id);
	}
}

function getParameterByName(name, url) {
    //regex to get id from after ?=
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function displayPairPopup() {
	popup.style.display="block";
	dimmer.style.display="block";
	setTimeout(() => {
		console.log(partnerIdInput);
		partnerIdInput.focus();
	}, 50);
}

function hidePopups() {
	let popups = document.getElementsByClassName("popup");
	for (let i = 0; i < popups.length; i++) {
		popups[i].style.display = 'none';
	}

	dimmer.style.display="none";
}

function shareLink() {
	if (document.getElementById('share').innerText == 'Share Link') {

		var x = document.createElement('input');
		x.style.display = 'none';
		x.setAttribute('id', 'sharing-link');
		var textToAdd = "https://rapp-code.com?id=";

		if (document.getElementById('user-id').innerText !== null && document.getElementById('user-id').innerText != ''){

			textToAdd = textToAdd + document.getElementById('user-id').innerText;
			x.setAttribute('value', textToAdd);
			document.getElementById('start-pair-popup').appendChild(x);
			document.getElementById('sharing-link').select();

			try {
				var successful = document.execCommand('copy');
				document.getElementById('share').innerText = 'Copied Link';
				setTimeout(() => {
					document.getElementById('share').innerText = 'Share Link';
				}, 2000);
	  		} catch (err) {
	    		console.log('Oops, unable to copy!');
				//display an error to the user here.
				document.getElementById('share').innerText = 'Failed';
				setTimeout(() => {
					document.getElementById('share').innerText = 'Share Link';
				}, 2000);
	  		}
		} else {
			document.getElementById('share').innerText = 'Not Connected';
			setTimeout(() => {
				document.getElementById('share').innerText = 'Share Link';
			}, 2000);
		}
	}
}
