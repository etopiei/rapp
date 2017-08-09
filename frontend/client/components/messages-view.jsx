import React from 'react';
import ReactDOM from 'react-dom';
import ChatMessage from './chat-message'

export default class ChatWindow extends React.Component {

	componentDidMount() {

	}

	render() {
		this.div = <div style={{height: '400px', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse'}} scrollHeight="1000px">
			{this.props.messages.map(message => {
				return <ChatMessage colors={this.props.colors} sender={message.sender} text={message.text} />
			})}
		</div>
		return this.div;
	}

}
