var popup = document.getElementById("start-pair-popup")
var dimmer = document.getElementById("background-dimmer")

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

