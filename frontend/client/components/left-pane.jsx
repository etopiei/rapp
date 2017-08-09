import React from "react";
import ReactDOM from "react-dom";
import Title from "./title";
import EditorSettingsWindow from './editor-settings/editor-settings-window';

export default class LeftPane extends React.Component {

	constructor() {
		super();
		this.state = {colors: {fg: 'rgb(235, 239, 231)', bg: 'rgb(38, 38, 38)', accent: 'rgb(115, 140, 115)'}};
	}

	componentDidMount() {
		this.props.dispatcher.push(this.setState.bind(this));
	}

	render() {
		return <div className = 'react-pane full-height' style={{width: this.props.width, backgroundColor: this.state.colors.bg, color: this.state.colors.fg, borderRight: `1px solid ${this.state.colors.fg}`}}>
			<Title text="rapp" colors={this.state.colors} />
			<EditorSettingsWindow colors={this.state.colors} dispatcher={this.props.dispatcher} editor={this.props.editor} />
		</div>
	}
}
