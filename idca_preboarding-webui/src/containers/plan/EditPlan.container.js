import { connect } from 'react-redux';
import EditPlan from '../../components/plan/EditPlan.component';
import {
	createField,
	initPreboardingPlan,
	initPlan,
	updatePlanID,
	savedPlan,
	savedMedia,
	deletedMedia,
	deleteMediaFailed,
} from '../../actions/plan.action';
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
		createField: args => dispatch(createField(args)),
		handleApiCall: (...args) => handleApiCall(dispatch, ...args),
		initPreboardingPlan: args => dispatch(initPreboardingPlan(args)),
		initPlan: args => dispatch(initPlan(args)),
		updatePlanID: args => dispatch(updatePlanID(args)),
		savedPlan: args => dispatch(savedPlan(args)),
		savedMedia: args => dispatch(savedMedia(args)),
		deletedMedia: args => dispatch(deletedMedia(args)),
		deleteMediaFailed: args => dispatch(deleteMediaFailed(args)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditPlan);
