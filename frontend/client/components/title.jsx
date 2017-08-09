import React from "react";
import ReactDOM from "react-dom";

export default class Title extends React.Component {
	render() {
		return <h1 className="title" style={{backgroundColor: this.props.colors.accent, color: this.props.colors.fg}}>{this.props.text}</h1>
	}
}
