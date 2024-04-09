import { connect } from 'react-redux';
import EmptyDrop from '../../components/plan/EmptyDrop.component';
import { createField } from '../../actions/plan.action';

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
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EmptyDrop);
