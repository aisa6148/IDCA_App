import { connect } from 'react-redux';
import EditComponent from '../../components/addOnPage/EditComponent.component';

// map state from store to props
const mapStateToProps = state => {
	return {
		// you can now say this.props.mappedAppSate
		mappedAddOnPageState: state.addOnPage,
	};
};
// map action to props
const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditComponent);
