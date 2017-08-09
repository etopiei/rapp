import React from "react";
import ReactDOM from "react-dom";
import ChatMessage from "./chat-message"
import MessagesView from './messages-view'

export default class ChatWindow extends React.Component {

	constructor() {
		super();
		//this.state = {messages: []};
		let messages = [];
		for (let i = 0; i < 100; i++) {
			messages.push({sender: Math.random(), text: Math.random()});
		}
		this.state = { messages };
		this.keys = [];
	}

	onKeyPress(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			this.sendMessage(e.target.value);
			e.preventDefault();
			e.target.value = '';
		}
	}

	componentDidMount() {
	}

	sendMessage(message) {
		this.onReceiveMessage('andrew', message);
	}

	onReceiveMessage(sender, text) {
		//this.setState({messages: [{sender, text}].concat(this.state.messages)});
		let messages = this.state.messages;
		messages.unshift({sender, text});
		if (messages.length > 100) {
			messages = messages.slice(0, 100);
		}
		this.setState({messages});
	}

	render() {
		return <div className='off-edge' style={{borderBottom: `1px solid ${this.props.colors.fg}`}}>
			<div className="window" style={{color: this.props.colors.fg, background: this.props.colors.bg}}>
				<MessagesView messages={this.state.messages} colors={this.props.colors} />
				<textarea id="chat-input" onKeyPress={this.onKeyPress.bind(this)}></textarea>
			</div>
		</div>
	}
}
