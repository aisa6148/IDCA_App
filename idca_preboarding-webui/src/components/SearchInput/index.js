import React, { Component } from 'react';
import Select from 'react-select';

class SearchInput extends Component {
	state = {
		selectedOption: null,
	};

	handleChange = selectedOption => {
		this.setState({ selectedOption }, () =>
			console.log(`Option selected:`, this.state.selectedOption),
		);
	};

	render() {
		const { selectedOption } = this.state;
		const { name, classNamePrefix, customStyles, options, ...otherProps } = this.props;
		console.log('propsL--- ', this.props);
		return (
			<Select
				{...otherProps}
				value={selectedOption}
				onChange={this.handleChange}
				options={options}
			/>
		);
	}
}

export default SearchInput;
