import React from "react";
import ReactDOM from "react-dom";
import Title from "./title";

export default class ChatMessage extends React.Component {

	render() {
		return <p style={{overflowWrap: 'break-word', borderTop: `1px solid ${this.props.colors.fg}`, margin: 0}} className="chat-message">
			<span className="sender" style={{color: this.props.colors.fg}}>{this.props.sender}</span>: {this.props.text}
		</p>
	}
}
