theme = getThemeFromStorage();

if (theme) {
	let elem = document.createElement("link");
	elem.setAttribute("rel", "stylesheet");
	elem.setAttribute("href", "../codemirror-5.24.2/theme/" + theme + ".css");
	document.getElementsByTagName("head")[0].appendChild(elem);

	editor.setOption("theme", theme);
}

mode = getLanguageFromStorage();

if (mode) {
	onChangeLanguage(mode);
}
