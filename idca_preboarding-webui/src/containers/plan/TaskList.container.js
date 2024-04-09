import { connect } from 'react-redux';
import TaskList from '../../components/plan/TaskList.component';
import {
	updatePlanHeading,
	updatePlanDescription,
	move,
	select,
	addTask,
	deleteTask,
	cloneTask,
	moveTaskDown,
	moveTaskUp,
} from '../../actions/plan.action';

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
		updatePlanHeading: args => dispatch(updatePlanHeading(args)),
		updatePlanDescription: args => dispatch(updatePlanDescription(args)),
		moveTaskList: args => dispatch(move(args)),
		select: args => dispatch(select(args)),
		addTask: args => dispatch(addTask(args)),
		deleteTask: args => dispatch(deleteTask(args)),
		cloneTask: args => dispatch(cloneTask(args)),
		moveTaskUp: args => dispatch(moveTaskUp(args)),
		moveTaskDown: args => dispatch(moveTaskDown(args)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TaskList);
