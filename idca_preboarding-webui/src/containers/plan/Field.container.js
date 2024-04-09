import { connect } from 'react-redux';
import Field from '../../components/plan/Field.component';
import {
	moveFieldUp,
	moveFieldDown,
	deleteField,
	cloneField,
	editLabel,
	editContent,
	createField,
	selectField,
	addMedia,
	removeMedia,
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
		moveFieldUp: args => dispatch(moveFieldUp(args)),
		moveFieldDown: args => dispatch(moveFieldDown(args)),
		deleteField: args => dispatch(deleteField(args)),
		cloneField: args => dispatch(cloneField(args)),
		editLabel: args => dispatch(editLabel(args)),
		editContent: args => dispatch(editContent(args)),
		createField: args => dispatch(createField(args)),
		selectField: args => dispatch(selectField(args)),
		handleApiCall: (...args) => handleApiCall(dispatch, ...args),
		addMedia: args => dispatch(addMedia(args)),
		removeMedia: args => dispatch(removeMedia(args)),
		savedMedia: args => dispatch(savedMedia(args)),
		deletedMedia: args => dispatch(deletedMedia(args)),
		deleteMediaFailed: args => dispatch(deleteMediaFailed(args)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Field);
