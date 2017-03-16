var myTextArea = document.getElementById('code');
var editor = CodeMirror.fromTextArea(myTextArea, {
		lineNumbers: true,
		mode: "javascript"
	});

var modeInput = document.getElementById("mode");
CodeMirror.modeURL = "codemirror-5.24.2/mode/%N/%N.js";

var themes = [
	{file: "3024-day.css", loaded: false},
	{file: "3024-night.css", loaded: false},
	{file: "abcdef.css", loaded: false},
	{file: "ambiance.css", loaded: false},
	{file: "ambiance-mobile.css", loaded: false},
	{file: "base16-dark.css", loaded: false},
	{file: "base16-light.css", loaded: false},
	{file: "bespin.css", loaded: false},
	{file: "blackboard.css", loaded: false},
	{file: "cobalt.css", loaded: false},
	{file: "colorforth.css", loaded: false},
	{file: "dracula.css", loaded: false},
	{file: "duotone-dark.css", loaded: false},
	{file: "duotone-light.css", loaded: false},
	{file: "eclipse.css", loaded: false},
	{file: "elegant.css", loaded: false},
	{file: "erlang-dark.css", loaded: false},
	{file: "hopscotch.css", loaded: false},
	{file: "icecoder.css", loaded: false},
	{file: "isotope.css", loaded: false},
	{file: "lesser-dark.css", loaded: false},
	{file: "liquibyte.css", loaded: false},
	{file: "material.css", loaded: false},
	{file: "mbo.css", loaded: false},
	{file: "mdn-like.css", loaded: false},
	{file: "midnight.css", loaded: false},
	{file: "monokai.css", loaded: false},
	{file: "neat.css", loaded: false},
	{file: "neo.css", loaded: false},
	{file: "night.css", loaded: false},
	{file: "panda-syntax.css", loaded: false},
	{file: "paraiso-dark.css", loaded: false},
	{file: "paraiso-light.css", loaded: false},
	{file: "pastel-on-dark.css", loaded: false},
	{file: "railscasts.css", loaded: false},
	{file: "rubyblue.css", loaded: false},
	{file: "seti.css", loaded: false},
	{file: "solarized.css", loaded: false},
	{file: "the-matrix.css", loaded: false},
	{file: "tomorrow-night-bright.css", loaded: false},
	{file: "tomorrow-night-eighties.css", loaded: false},
	{file: "ttcn.css", loaded: false},
	{file: "twilight.css", loaded: false},
	{file: "vibrant-ink.css", loaded: false},
	{file: "xq-dark.css", loaded: false},
	{file: "xq-light.css", loaded: false},
	{file: "yeti.css", loaded: false},
	{file: "zenburn.css", loaded: false}
];

var themeSelector = document.getElementById("themeSelector");
for (i in themes) {
	let option = document.createElement("option");
		
		//remove the .css
	option.innerText = themes[i].file.split('.')[0];
	themeSelector.appendChild(option);
}

	//elegant theme
themeSelector.selectedIndex = 15;

function changeTheme() {
	let index = themeSelector.selectedIndex;
	let themeFile = themes[index].file;
	loadTheme(themeFile);
	editor.setOption("theme", themes[index].file.split('.')[0]); 
}

function loadTheme(theme) {
	let elem = document.createElement("link");
	elem.setAttribute("rel", "stylesheet");
	elem.setAttribute("href", "codemirror-5.24.2/theme/" + theme);
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

	//send the chat messaeg to the server

	var message = document.getElementById('chat-text').textContent;
	console.log("Sending message: " + message);

}

changeLanguage();
