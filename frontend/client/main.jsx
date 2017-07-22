import React from "react";
import ReactDOM from "react-dom";
import LeftPane from "./components/left-pane";
import RightPane from "./components/right-pane";
import CMSettings from './cm-settings';
import Themes from './themes';
require('styles/main.scss');
require('styles/themes.scss');

require('./modes');

let dispatcher = [];

const leftPane = <LeftPane dispatcher={dispatcher} />
const rightPane = <RightPane dispatcher={dispatcher} />

ReactDOM.render(leftPane, document.getElementById('left-pane'));
ReactDOM.render(rightPane, document.getElementById('right-pane'));

let editor = CodeMirror.fromTextArea(document.getElementById('base-textarea'), CMSettings);
editor.setSize('100%', '100%');
editor.setOption('mode', 'text/x-c++src');
editor.setValue('#include <iostream>\n\nint main() {\n\tint x = 1;\n\tstd::cout << "Hello, world!\\n";\n}');
function changeTheme(theme) {
	editor.setOption('theme', theme);
	let fg = Themes[theme].fg;
	let bg = Themes[theme].bg;
	let accent = Themes[theme].accent;
	for (let i = 0; i < dispatcher.length; i++) {
		dispatcher[i]({fg, bg, accent});
	}
}

let Tremes = Object.keys(Themes);
let counter = 0;
editor.setOption('theme', Tremes[0]);
const eElem = editor.display.wrapper;

const themes = {};

let i = 0;
function seeThemes() {
	let theme = Object.keys(Themes)[i];
	++i;
	changeTheme(theme);
	console.log(theme);
	if (i < Object.keys(Themes).length)
		setTimeout(seeThemes, 1000);
}

//seeThemes();

changeTheme('lesser-dark');

window.ct = changeTheme;
