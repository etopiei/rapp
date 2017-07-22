import React from "react";
import ReactDOM from "react-dom";
import Title from "./title";

export default class LeftPane extends React.Component {

	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		this.props.dispatcher.push(this.setState.bind(this));
	}

	render() {
		console.log(this.bg);
		return <div className = 'full-height' style={{width: this.props.width, backgroundColor: this.state.bg, color: this.state.fg, borderRight: `1px solid ${this.state.accent}`}}>
			<Title text="rapp" bg={this.state.bg} fg={this.state.fg} accent={this.state.accent} />
		</div>
	}
}
