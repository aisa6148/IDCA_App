import * as React from 'react';
import Oops from './Oops';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { errorOccurred: false };
	}

	componentDidCatch(error, info) {
		this.setState({ errorOccurred: true });
		console.error(error, info);
	}

	render() {
		return this.state.errorOccurred ? <Oops /> : this.props.children;
	}
}
