import React from "react";
import ReactDOM from "react-dom";
import Title from "./title";

export default class ChatMessage extends React.Component {

	render() {
		return <div className="chat-message">
			<span className="sender">{this.props.sender}</span>: {this.props.text}
		</div>
	}
}
