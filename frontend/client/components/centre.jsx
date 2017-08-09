import React from "react";
import ReactDOM from "react-dom";
import Editor from '../editor';

export default class Centre extends React.Component {

	constructor() {
		super();
		this.state = {};
		this.editor = new Editor(this.textarea);
	}

	render() {
		return this.editor.cm;
	}
}
