import React from "react";
import ReactDOM from "react-dom";

export default class PairWindow extends React.Component {
	render() {
		constructor() {
			super();
			this.state = {pairedUsers: []};
		}

		return <div class="window">
			{this.state.pairedUsers.map(username => {
				return <p>{username}</p>
			})}
			<input type="text" placeholder="" />
		</div>
	}
}
