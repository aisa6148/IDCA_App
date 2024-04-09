import { connect } from 'react-redux';
import ProgressBar from '../../components/common/ProgressBar.component';

// map state from store to props
const mapStateToProps = state => {
	return {
		// you can now say this.props.mappedAppSate
		mappedLoadingState: state.appState.loading || 0,
	};
};
// map actions to props
const mapDispatchToProps = () => {
	return {};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProgressBar);
