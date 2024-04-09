import { connect } from 'react-redux';
import Field from '../../components/addOnPage/Field.component';
import {
	moveFieldUp,
	moveFieldDown,
	deleteField,
	cloneField,
	editLabel,
	editContent,
	createField,
	selectField,
} from '../../actions/addOnPage.action';
import { handleApiCall } from '../../actions/common.action';

// map state from store to props
const mapStateToProps = state => {
	return {
		// you can now say this.props.mappedAppSate
		mappedAddOnPageState: state.addOnPage,
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
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Field);
