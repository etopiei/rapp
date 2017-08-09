import React from 'react';
import ReactDOM from 'react-dom';
import Toggle from './toggle';
import Dropdown from './dropdown';
import TextInput from './text-input';
import themes from '../../themes';
import languages from '../../languages';
import defaultOptions from '../../defaultOptions';

const themeNames = Object.keys(themes);

const dropdownSettings = {
	theme: themeNames,
	mode: languages.cmModes,
}

export default class EditorSettingsWindow extends React.Component {

	constructor() {
		super();
		this.state = defaultOptions;
	}

	changeDropdownSetting(cmOption, index) {
		let state = {};
		state[cmOption] = index;
		this.setState(state);
		this.props.editor.setOption(cmOption, dropdownSettings[cmOption][index]);
	}

	changeTheme(cmSetting, index) {
		this.setState({'theme': index});
		this.props.editor.setOption('theme', themeNames[index]);
		let fg = themes[themeNames[index]].fg;
		let bg = themes[themeNames[index]].bg;
		let accent = themes[themeNames[index]].accent;
		for (let i = 0; i < this.props.dispatcher.length; i++) {
			this.props.dispatcher[i]({colors: {fg, bg, accent}});
		}
	}

	changeText(cmOption, value) {
		if (typeof this.state[cmOption] === 'number') {
			value = parseInt(value);
			if (isNaN(value)) {
				value = 0;
			}
		}
		let state = {};
		state[cmOption] = value;
		this.setState(state);
		this.props.editor.setOption(cmOption, value);
	}

	changeToggle(cmOption, value) {
		let state = {};
		state[cmOption] = value;
		this.setState(state);
		this.props.editor.setOption(cmOption, value);
	}

	addDefaultSettings() {
		this.setState(defaultOptions);
		for (let key in defaultOptions) {
			let value = defaultOptions[key];
			this.props.editor.options[key] = value;
		}
		this.props.editor.setOption('mode', 'javascript');
		this.changeTheme(undefined, this.state.theme);
	}

	componentDidMount() {
		this.addDefaultSettings();
	}

	render() {
		let editor = this.props.editor;
		return <div className="off-edge">
			<Dropdown text="Theme" selectedIndex={this.state.theme} cmSetting="theme" options={themeNames} onChange={this.changeTheme.bind(this)} />
			<Dropdown text="Language" selectedIndex={this.state.mode} cmSetting='mode' displayOptions={languages.languages} options={languages.cmModes} onChange={this.changeDropdownSetting.bind(this)} />
			<Toggle text="Line highlight" cmSetting="styleActiveLine" checked={this.state.styleActiveLine} onChange={this.changeToggle.bind(this)} />
			<Toggle text="Hard tabs" cmSetting="indentWithTabs" checked={this.state.indentWithTabs} onChange={this.changeToggle.bind(this)} />
			<TextInput text="Indent unit" cmSetting="indentUnit" value={this.state.indentUnit} onChange={this.changeText.bind(this)} />
			<TextInput text="Tab width" cmSetting="tabSize" value={this.state.tabSize} onChange={this.changeText.bind(this)} />
			<Toggle text="Line numbers" cmSetting="lineNumbers" checked={this.state.lineNumbers} onChange={this.changeToggle.bind(this)} />
			<Toggle text="Match brackets" cmSetting="matchBrackets" checked={this.state.matchBrackets} onChange={this.changeToggle.bind(this)} />
			<TextInput text="Undo depth" cmSetting="undoDepth" value={this.state.undoDepth} onChange={this.changeText.bind(this)} />
			<Toggle text="Line wrap" cmSetting="lineWrapping" checked={this.state.lineWrapping} onChange={this.changeToggle.bind(this)} />
		</div>
	}
}
