import React from "react";
import ReactDOM from "react-dom";

export default class Title extends React.Component {
	render() {
		return <h1 className="title" style={{backgroundColor: this.props.fg, color: this.props.accent}}>{this.props.text}</h1>
	}
}
