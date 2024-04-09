import { connect } from 'react-redux';
import Notifications from '../../components/common/Notification.component';
import {
	removeErrorMessage,
	removeNotificationMessage,
	removeSuccessMessage,
} from '../../actions/common.action';
// map state from store to props
const mapStateToProps = state => {
	return {
		// you can now say this.props.mappedAppSate
		mappedErrorMessages: state.appState.errorMessages,
		mappedSuccessMessages: state.appState.successMessages,
		mappedNotifications: state.appState.notifications,
	};
};
// map actions to props
const mapDispatchToProps = dispatch => {
	return {
		mappedRemoveErrorMessage: args => dispatch(removeErrorMessage(args)),
		mappedRemoveNotificationMessage: args => dispatch(removeNotificationMessage(args)),
		mappedRemoveSuccessMessage: args => dispatch(removeSuccessMessage(args)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Notifications);
