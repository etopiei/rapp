import React from "react";
import ReactDOM from "react-dom";
import ChatMessage from "./chat-message"

export default class ChatWindow extends React.Component {

	constructor() {
		super();
		this.state = {messages: [{sender: 'andrew', text: 'hello'}]};
	}

	render() {
		return <div>
			<div class="window" style={{color: this.props.fg, background: this.props.bg}}>
				{this.state.messages.map(message => {
					return <ChatMessage sender={message.sender} text={message.text} />
				})}
			</div>
			<textarea id="chat-input"></textarea>
		</div>
	}
}
