var myTextArea = document.getElementById('code');
var editor = CodeMirror.fromTextArea(myTextArea, {
		lineNumbers: true,
		mode: "javascript"
	});

var modeInput = document.getElementById("mode");
CodeMirror.modeURL = "codemirror-5.24.2/mode/%N/%N.js";

var themes = [
	{name: "3024-day", loaded: false},
	{name: "3024-night", loaded: false},
	{name: "abcdef", loaded: false},
	{name: "ambiance", loaded: false},
	{name: "ambiance-mobile", loaded: false},
	{name: "base16-dark", loaded: false},
	{name: "base16-light", loaded: false},
	{name: "bespin", loaded: false},
	{name: "blackboard", loaded: false},
	{name: "cobalt", loaded: false},
	{name: "colorforth", loaded: false},
	{name: "dracula", loaded: false},
	{name: "duotone-dark", loaded: false},
	{name: "duotone-light", loaded: false},
	{name: "eclipse", loaded: false},
	{name: "elegant", loaded: false},
	{name: "erlang-dark", loaded: false},
	{name: "hopscotch", loaded: false},
	{name: "icecoder", loaded: false},
	{name: "isotope", loaded: false},
	{name: "lesser-dark", loaded: false},
	{name: "liquibyte", loaded: false},
	{name: "material", loaded: false},
	{name: "mbo", loaded: false},
	{name: "mdn-like", loaded: false},
	{name: "midnight", loaded: false},
	{name: "monokai", loaded: false},
	{name: "neat", loaded: false},
	{name: "neo", loaded: false},
	{name: "night", loaded: false},
	{name: "panda-syntax", loaded: false},
	{name: "paraiso-dark", loaded: false},
	{name: "paraiso-light", loaded: false},
	{name: "pastel-on-dark", loaded: false},
	{name: "railscasts", loaded: false},
	{name: "rubyblue", loaded: false},
	{name: "seti", loaded: false},
	{name: "solarized", loaded: false},
	{name: "the-matrix", loaded: false},
	{name: "tomorrow-night-bright", loaded: false},
	{name: "tomorrow-night-eighties", loaded: false},
	{name: "ttcn", loaded: false},
	{name: "twilight", loaded: false},
	{name: "vibrant-ink", loaded: false},
	{name: "xq-dark", loaded: false},
	{name: "xq-light", loaded: false},
	{name: "yeti", loaded: false},
	{name: "zenburn", loaded: false}
];

var themeSelector = document.getElementById("themeSelector");
for (i in themes) {
	let option = document.createElement("option");
		
		//remove the .css
	option.innerText = themes[i].name;
	themeSelector.appendChild(option);
}

function setOriginalTheme(){

	var storedTheme = getThemeFromStorage();

	if (storedTheme == "") {

		//elegant theme
		themeSelector.selectedIndex = 15;
		setOriginalTheme();

	}

	else {

		for (var i = 0; i < themes.length; i++) {

			if (themes[i].name == storedTheme) {

				themeSelector.selectedIndex = i;
				break;

			}

		}

		changeTheme();

	}

}

function changeTheme() {
	let index = themeSelector.selectedIndex;
	let themeFile = themes[index].name;
	themeStorage(themeFile);
	loadTheme(themeFile);
	editor.setOption("theme", themes[index].name); 
}

function loadTheme(theme) { //THEME PARAMTER SHOULD BE OF FORM: "name"
	let elem = document.createElement("link");
	elem.setAttribute("rel", "stylesheet");
	elem.setAttribute("href", "codemirror-5.24.2/theme/" + theme + ".css");
	document.getElementsByTagName("head")[0].appendChild(elem);
}


function changeLanguage() {
	let mode = modeInput.options[modeInput.selectedIndex].value;
	console.log(mode);
	CodeMirror.requireMode(mode, ()=> {
		editor.setOption("mode", mode); 
	});
}

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

	//this is temporary to display chat message locally, eventually they will be just sent to the server

	displayMessage(message);

	//clear chat box
	chatBox.value = "";

}

function displayMessage(messageText, username) {

	if (username == undefined) {
		username = "Guest"
	}

	if (document.getElementById('messages-display').innerHTML == "") {
		textToDisplay = username + ": " + messageText;
	}
	else {
		textToDisplay = "<br>" + username + ": " + messageText;
	}

	document.getElementById('messages-display').innerHTML+= textToDisplay;

}

setOriginalTheme();
changeLanguage();
