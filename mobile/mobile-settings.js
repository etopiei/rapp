
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

//Bind events to headers
document.getElementById("themeHeader").addEventListener("click",function(){
	selected = document.getElementsByClassName("settingsTypeHeader selected");
	if (selected.length > 0) selected[0].setAttribute("class", "settingsTypeHeader");
	this.setAttribute("class", "settingsTypeHeader selected");

	loadThemes();
});
//Bind events to headers
document.getElementById("languageHeader").addEventListener("click",function(){
	selected = document.getElementsByClassName("settingsTypeHeader selected");
	if (selected.length > 0) selected[0].setAttribute("class", "settingsTypeHeader");
	this.setAttribute("class", "settingsTypeHeader selected");

	loadLang();
});

function loadThemes() {
	document.getElementById("settingsList").innerHTML = "";
	for (i in themes) {
	  theme = themes[i].name;
	  let item = document.createElement("div");
	  item.setAttribute("class","settingsItem");
		item.setAttribute("id",theme);
	  item.innerHTML = theme;
	  item.addEventListener("click",function(){
	    console.log(this.innerHTML);
	    themeStorage(this.innerHTML);
			selected = document.getElementsByClassName("settingsItem selected");
			if (selected.length > 0) selected[0].setAttribute("class", "settingsItem");
			this.setAttribute("class", "settingsItem selected");
	  })
	  document.getElementById("settingsList").appendChild(item);
	}

	currentTheme = getThemeFromStorage();

	if (currentTheme) document.getElementById(currentTheme).setAttribute("class", "settingsItem selected");
}

function loadLang() {
	document.getElementById("settingsList").innerHTML = "";
	for (i in modes) {
	  mode = modes[i];
	  let item = document.createElement("div");
	  item.setAttribute("class","settingsItem");
		item.setAttribute("id",mode);
	  item.innerHTML = mode;
	  item.addEventListener("click",function(){
	    console.log(this.innerHTML);
	    languageStorage(this.innerHTML);
			selected = document.getElementsByClassName("settingsItem selected");
			if (selected.length > 0) selected[0].setAttribute("class", "settingsItem");
			this.setAttribute("class", "settingsItem selected");
	  })
	  document.getElementById("settingsList").appendChild(item);
	}

	currentLang = getLanguageFromStorage();

	if (currentLang) document.getElementById(currentLang).setAttribute("class", "settingsItem selected");
}

loadThemes();
