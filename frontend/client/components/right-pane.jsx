import React from "react";
import ReactDOM from "react-dom";
import ChatWindow from "./chat-window"

export default class RightPane extends React.Component {

	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		this.props.dispatcher.push(this.setState.bind(this));
	}

	render() {
		return <div className="full-height" style={{width: this.props.width, backgroundColor: this.state.bg, color: this.state.fg, borderLeft: `1px solid ${this.state.accent}`}}>
			<ChatWindow fg={this.state.fg} bg={this.state.bg} />
		</div>
	}
}
