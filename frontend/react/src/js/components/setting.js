
import React from "react";
import ReactDOM from "react-dom";
import ChatMessage from "./chat-message"

export default class Setting extends React.Component {

	constructor() {
		super();
		this.state = {messages: []};
	}

	render() {
		return <div>
			<div class="window" style={{color: this.props.fg, background: this.props.bg}}>
				{this.state.messages.map(message => {
					return <ChatMessage sender={message.sender} text={message.text} />
				})}
			</div>
			<textarea class="chat-input"></textarea>
		</div>
	}
}
