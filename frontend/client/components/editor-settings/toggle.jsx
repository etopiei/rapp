import React from 'react';
import ReactDOM from 'react-dom';

export default class Toggle extends React.Component {

	onChange(e) {
		this.props.onChange(this.props.cmSetting, e.target.checked);
	}

	render() {
		let box = null;
		if (this.props.checked) {
			box = <input style={{marginLeft: '1em'}} type="checkbox" checked={this.props.checked} onChange={this.onChange.bind(this)} />
		} else {
			box = <input style={{marginLeft: '1em'}} type="checkbox" onChange={this.onChange.bind(this)} />
		}
		return <div>
			{this.props.text}: {box}
		</div>
	}
}
