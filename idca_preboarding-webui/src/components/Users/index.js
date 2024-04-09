import React from 'react';
import PropTypes from 'prop-types';

class Users extends React.Component {
	render() {
		return <h1>{this.props.label || 'Users Page'}</h1>;
	}
}
Users.propTypes = {
	label: PropTypes.string,
};
export default Users;
