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
	popup.style.display="none";
	dimmer.style.display="none";
}

