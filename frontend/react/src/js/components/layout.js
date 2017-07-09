import React from "react";
import ReactDOM from "react-dom";
import LeftPane from "./left-pane";
import Centre from "./centre";
import RightPane from "./right-pane";

export default class Layout extends React.Component {

	render() {
		return <div>
			<LeftPane width="15%" bg="#111" fg="#ddd" />
			<Centre width="70%" bg="#111" fg="#ddd" />
			<RightPane width="15%" bg="#111" fg="#ddd" />
		</div>
	}
}
