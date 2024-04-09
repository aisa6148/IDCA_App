import { connect } from 'react-redux';
import PlansComponent from '../../components/plan/Plans.component';
import { handleMultipleApiCall } from '../../actions/common.action';

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
)(PlansComponent);
