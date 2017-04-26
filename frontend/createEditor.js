var myTextArea = document.getElementById('code');
var editor = CodeMirror.fromTextArea(myTextArea, {
		lineNumbers: true,
		mode: "javascript",
		indentUnit: 4,
		indentWithTabs: true
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

var modes = [
	"apl",
	"asciiarmor",
	"asn.1",
	"asterisk",
	"brainfuck",
	"C",
	"C#",
	"C++",
	"Ceylon",
	"clojure",
	"cmake",
	"cobol",
	"coffeescript",
	"commonlisp",
	"crystal",
	"css",
	"cypher",
	"d",
	"dart",
	"diff",
	"django",
	"dockerfile",
	"dtd",
	"dylan",
	"ebnf",
	"ecl",
	"eiffel",
	"elm",
	"erlang",
	"factor",
	"fcl",
	"forth",
	"fortran",
	"gas",
	"gfm",
	"gherkin",
	"go",
	"groovy",
	"haml",
	"handlebars",
	"haskell",
	"haskell-literate",
	"haxe",
	"htmlembedded",
	"htmlmixed",
	"http",
	"idl",
	"index.html",
	"Java",
	"javascript",
	"jinja2",
	"jsx",
	"julia",
	"livescript",
	"lua",
	"markdown",
	"mathematica",
	"mbox",
	"meta.js",
	"mirc",
	"mllike",
	"modelica",
	"mscgen",
	"mumps",
	"nginx",
	"nsis",
	"ntriples",
	"Objective-C",
	"octave",
	"oz",
	"pascal",
	"pegjs",
	"perl",
	"php",
	"pig",
	"powershell",
	"properties",
	"protobuf",
	"pug",
	"puppet",
	"python",
	"q",
	"r",
	"rpm",
	"rst",
	"ruby",
	"rust",
	"sas",
	"sass",
	"Scala",
	"scheme",
	"shell",
	"sieve",
	"slim",
	"smalltalk",
	"smarty",
	"solr",
	"soy",
	"sparql",
	"spreadsheet",
	"sql",
	"Squirrel",
	"stex",
	"stylus",
	"swift",
	"tcl",
	"textile",
	"tiddlywiki",
	"tiki",
	"toml",
	"tornado",
	"troff",
	"ttcn",
	"ttcn-cfg",
	"turtle",
	"twig",
	"vb",
	"vbscript",
	"velocity",
	"verilog",
	"vhdl",
	"vue",
	"webidl",
	"xml",
	"xquery",
	"yacas",
	"yaml",
	"yaml-frontmatter",
	"z80"
];

c_like = {
	"C": "text/x-csrc",
	"C++": "text/x-c++src",
	"Java": "text/x-java",
	"C#": "text/x-csharp",
	"Objective-C": "text/objectivec",
	"Scala": "text/x-scala",
	"Squirrel": "text/x-squirrel",
	"Ceylon": "text/x-ceylon"
};

for (i in modes) {
	let option = document.createElement("option");
	option.innerText = modes[i];
	option.value = modes[i];
	modeInput.appendChild(option);
}


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
		setOriginalTheme(); //IS THIS NECESSARY?

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

function loadTheme(theme) { //THEME PARAMETER SHOULD BE OF FORM: "name"
	let elem = document.createElement("link");
	elem.setAttribute("rel", "stylesheet");
	elem.setAttribute("href", "codemirror-5.24.2/theme/" + theme + ".css");
	document.getElementsByTagName("head")[0].appendChild(elem);
}

var keyMapSelector = document.getElementById("keymap-selector");

function changeKeyMap() {
	let value = keyMapSelector[keyMapSelector.selectedIndex].value;
	editor.setOption("keyMap", value);
}

modeInput.selectedIndex = 0;

function onChangeLanguage(mode, outside) {
	if (outside) {
		let index = modes.indexOf(mode);
		console.log(mode);
		console.log(index);
		if (index !== -1) {
			modeInput.selectedIndex = index;
		}
	}
	let lang = mode;
	if (typeof c_like[mode] === "string") {
		lang = c_like[mode];
		mode = "clike"
	}
	CodeMirror.requireMode(mode, ()=> {
		editor.setOption("mode", lang);
	});
}

function changeLanguage() {
	let mode = modeInput.options[modeInput.selectedIndex].value;
	languageStorage(mode);
	onChangeLanguage(mode);
	if (typeof socket === "object") {
		socket.changeLanguage(mode);
	}
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

	sendMessage(message);

	//clear chat box
	chatBox.value = "";

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
	}
}

function saveTextAsFile()
{
	var textToWrite = editor.getValue();
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});

	//This is hacky and yuck, replace it later with a proper pop up interface like the pairing
	var fileNameToSaveAs = prompt("Save file as?", "");

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
	downloadLink.remove();
}

function clearEditorText() {
	editor.setValue("");
}

function giveOptions() {
	document.getElementById('dropdown-button').style.display = 'none';
	var x = document.getElementById('toolbar')
	x.style.display = 'block';
	x.style.height = '10%';
}

function closeOptions() {
	document.getElementById('dropdown-button').style.display = 'block';
	document.getElementById('toolbar').style.display = 'none';
}

function goFullScreen() {

	document.getElementById('chat-area').style.display = 'none';

	var z = document.getElementById('close-fullscreen');
	z.style.position = 'absolute';
	z.style.display = 'block';
	z.style.top = '10';
	z.style.right = '10';
	z.style.height = '40px';
	z.style.width = '40px';

	var x = document.getElementById('text-area');
	x.style.position = 'absolute';
	x.style.top = '0';
	x.style.left = '0';
	x.style.width = '100%';
	x.style.height = '100%';
	x.style.zIndex = '800';

}

function closeFullscreen() {

	document.getElementById('chat-area').style.display = 'block';

	var x = document.getElementById('text-area');
	x.style.position = 'relative';
	x.style.width = '100%';
	x.style.height = '100%';
	x.style.zIndex = '1';

	var z = document.getElementById('close-fullscreen');
	z.style.display = 'none';

	var y = document.getElementById('chat-notification');
	y.style.display = 'none';
	y.children[0].innerText = "";

}

setOriginalTheme();
var storedLanguage = getLanguageFromStorage();
document.getElementById('mode').value = storedLanguage;
changeLanguage();

var storedText = retrieveFile();
console.log(storedText);
editor.setValue(storedText);
