import * as React from 'react';
import injectSheet from 'react-jss';
import { Button } from '@material-ui/core';
// import Button from "@material-ui/core/Button";
class Oops extends React.Component {
	render() {
		const styles = this.props.classes;
		return (
			<div className={styles.Oops}>
				<div className={styles.wentWrong}>Oops! Something went wrong</div>
				<div className={styles.Followed}>
					The link you followed is probably broken or the page has been removed.
				</div>
				<div className={styles.Image}>
					<img src="/icons/Oops404.svg" alt="Oops" />
				</div>
				<Button onClick={e => (window.location = '/')} variant="outlined" color="primary">
					Go back to home page
				</Button>
			</div>
		);
	}
}
const StyleClasses = {
	Oops: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: '#F4F7FC',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		zIndex: '2000',
		top: 0,
		left: 0,
	},
	wentWrong: {
		fontFamily: 'Bogle',
		fontSize: '2.5rem',
		fontWeight: 'bold',
		color: '#272837',
		margin: '10px',
	},
	Followed: {
		marginBottom: '60px',
		fontFamily: 'Bogle',
		fontSize: '0.9rem',
		color: '#707288',
	},
	Image: { width: '11rem', display: 'flex', justifyContent: 'center' },
	Button: {
		marginTop: '60px',
		height: '40px',
		borderRadius: '6px',
		boxShadow: '0 3px 5px 0 rgba(0, 76, 145, 0.3)',
		backgroundColor: '#004c91',
		color: '#ffffff',
		padding: '0px 20px',
		'&:hover': {
			backgroundColor: '#004c91',
		},
	},
};
export default injectSheet(StyleClasses)(Oops);
