import { connect } from 'react-redux';
import Publish from '../../components/plan/Publish.component';
import { handleApiCall } from '../../actions/common.action';

// map state from store to props
const mapStateToProps = state => {
	return {
		// you can now say this.props.mappedAppSate
		mappedPlanState: state.plan,
	};
};
// map actions to props
const mapDispatchToProps = dispatch => {
	return {
		handleApiCall: (...args) => handleApiCall(dispatch, ...args),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Publish);
