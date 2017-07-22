let counter = 0;
editor.setOption('theme', Tremes[0]);
const eElem = editor.display.wrapper;

const themes = {};

const accentKeys = ['keyword', 'meta', 'type', 'def', 'variable', 'number', 'string'];
function getStyle() {
	const fg = window.getComputedStyle(eElem).color;
	const bg = window.getComputedStyle(eElem).backgroundColor;
	let accent = fg;
	let i = 0;
	do {
		let key = accentKeys[i++];
		const s = document.querySelectorAll(`.cm-s-${Tremes[counter]} span.cm-${key}`)[0];
		if (s) accent = (window.getComputedStyle(s).color);
	} while (accent === fg && i < accentKeys.length);
	themes[Tremes[counter]] = {fg, bg, accent};
	++counter;
	if (counter < Tremes.length) {
		editor.setOption('theme', Tremes[counter]);
		setTimeout(getStyle, 200);
	} else {exit()}
}

function exit() {
	document.write(JSON.stringify(themes));
}

setTimeout(getStyle, 200);
