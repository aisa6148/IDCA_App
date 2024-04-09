import { connect } from 'react-redux';
import { handleMultipleApiCall } from '../../actions/common.action';
import Page from '../../components/addOnPage/Pages.component';

export const mapStateToProps = state => {
	return {
		role: state.userData && state.userData.roles,
	};
};

export const mapDispatchToProps = dispatch => {
	return {
		handleMultipleApiCall: (...args) => handleMultipleApiCall(dispatch, ...args),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Page);
