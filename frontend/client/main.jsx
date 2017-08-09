import React from "react";
import ReactDOM from "react-dom";
import LeftPane from "./components/left-pane";
import RightPane from "./components/right-pane";
import CMSettings from './cm-settings';
import Themes from './themes';
require('styles/main.scss');
require('styles/themes.scss');

require('./modes');
require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/edit/matchbrackets.js');

const themeNames = Object.keys(Themes);

const dispatcher = [];

let editor = CodeMirror.fromTextArea(document.getElementById('base-textarea'), CMSettings);

const rightPane = <RightPane dispatcher={dispatcher} />
const leftPane = <LeftPane dispatcher={dispatcher} themes={themeNames} editor={editor} />

ReactDOM.render(leftPane, document.getElementById('left-pane'));
ReactDOM.render(rightPane, document.getElementById('right-pane'));

editor.setSize('100%', '100%');
editor.setOption('mode', 'text/x-c++src');
editor.setValue('#include <iostream>\n\nint main() {\n\tint x = 1;\n\tstd::cout << "Hello, world!\\n";\n}');
