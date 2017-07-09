import React from "react";
import ReactDOM from "react-dom";
import Title from "./title";

export default class LeftPane extends React.Component {

	constructor() {
		super();
		this.state = {};
	}

	render() {
		return <div class="pane" style={{width: this.props.width}}>
			<Title text="rapp" bg={this.props.bg} fg={this.props.fg} />
		</div>
	}
}
