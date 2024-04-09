import { connect } from 'react-redux';
import EditTask from '../../components/plan/EditTask.component';
import { updateTask } from '../../actions/plan.action';

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
		updateTask: args => dispatch(updateTask(args)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditTask);
