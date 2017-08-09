import React from 'react';
import ReactDOM from 'react-dom';

export default class Dropdown extends React.Component {

	onChange(e) {
		this.props.onChange(this.props.cmSetting, e.target.selectedIndex);
	}

	render() {
		const selectedIndex = this.props.selectedIndex;
		let displayOptions = this.props.displayOptions;
		if (!displayOptions) {
			displayOptions = this.props.options;
		}

		let display = displayOptions.map(option => {
			return <option>{option}</option>
		});

		return <div>
			{this.props.text}: 
			<select value={displayOptions[selectedIndex]} style={{marginLeft: '1em'}} onChange={this.onChange.bind(this)}>
				{display}
			</select>
		</div>
	}
}
