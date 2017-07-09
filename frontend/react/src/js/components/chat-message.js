import React from "react";
import ReactDOM from "react-dom";
import Title from "./title";

export default class ChatMessage extends React.Component {

	render() {
		return <div class="chat-message">
			<span class="sender">{this.props.sender}</span>: {this.props.text}
		</div>
	}
}
