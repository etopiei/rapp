import React from "react";
import ReactDOM from "react-dom";

export default class Centre extends React.Component {

	constructor() {
		super();
		this.state = {};
	}

	render() {
		return <div class="pane" style={{width: this.props.width}}>
			Hello, world!
		</div>
	}
}
