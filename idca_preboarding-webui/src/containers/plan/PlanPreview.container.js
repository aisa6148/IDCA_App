import { connect } from 'react-redux';
import PlanPreview from '../../components/plan/PlanPreview.component';
import { initPreboardingPlan, initPlan } from '../../actions/plan.action';
import { handleApiCall, handleApiCallBlob } from '../../actions/common.action';

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
		handleApiCallBlob: (...args) => handleApiCallBlob(dispatch, ...args),
		initPreboardingPlan: args => dispatch(initPreboardingPlan(args)),
		initPlan: args => dispatch(initPlan(args)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PlanPreview);
