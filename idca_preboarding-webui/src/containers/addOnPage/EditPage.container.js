import { connect } from 'react-redux';
import EditPage from '../../components/addOnPage/EditPage.component';
import { handleApiCall } from '../../actions/common.action';
import {
	createField,
	updateHeading,
	initPreboardingPage,
	initPage,
	updatePageID,
	savedPage,
} from '../../actions/addOnPage.action';
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
		createField: args => dispatch(createField(args)),
		handleApiCall: (...args) => handleApiCall(dispatch, ...args),
		updateHeading: args => dispatch(updateHeading(args)),
		initPreboardingPage: args => dispatch(initPreboardingPage(args)),
		initPage: args => dispatch(initPage(args)),
		updatePageID: args => dispatch(updatePageID(args)),
		savedPage: args => dispatch(savedPage(args)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditPage);
