import React from 'react';
import PropTypes from 'prop-types';

class Contact extends React.Component {
	render() {
		return <h1>{this.props.label || 'Contact Page'}</h1>;
	}
}

Contact.propTypes = {
	label: PropTypes.string,
};
export default Contact;
