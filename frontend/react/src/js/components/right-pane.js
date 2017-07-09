import React from "react";
import ReactDOM from "react-dom";
import ChatWindow from "./chat-window"

export default class RightPane extends React.Component {

	constructor() {
		super();
		this.state = {};
	}

	render() {
		return <div class="pane" style={{width: this.props.width}}>
			<ChatWindow fg={this.props.fg} bg={this.props.bg} />
		</div>
	}
}
