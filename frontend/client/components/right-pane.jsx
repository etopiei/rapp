import React from "react";
import ReactDOM from "react-dom";
import ChatWindow from "./chat-window"

export default class RightPane extends React.Component {

	constructor() {
		super();
		this.state = {colors: {fg: 'rgb(235, 239, 231)', bg: 'rgb(38, 38, 38)', accent: 'rgb(115, 140, 115)'}};
	}

	componentDidMount() {
		this.props.dispatcher.push(this.setState.bind(this));
	}

	render() {
		return <div className="react-pane full-height" style={{width: this.props.width, backgroundColor: this.state.colors.bg, color: this.state.colors.fg, borderLeft: `1px solid ${this.state.colors.fg}`}}>
			<ChatWindow colors={this.state.colors} />
		</div>
	}
}
