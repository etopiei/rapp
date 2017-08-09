import React from 'react';
import ReactDOM from 'react-dom';

export default class TextInput extends React.Component {
	onChange(e) {
		this.props.onChange(this.props.cmSetting, e.target.value);
	}

	render() {
		return <div>
			{this.props.text}: <input type="text" value={this.props.value} onChange={this.onChange.bind(this)} />
		</div>
	}
}
