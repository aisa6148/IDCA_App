import React from 'react';
import Spark from '../../assets/img/logo.png';

const ThankYouModal = ({
	sendEmail,
	raiseServiceNowTicket,
	thankyouHeading,
	successMessage,
	fianlMessage,
	closeThankYouModal,
}) => {
	const succMsg =
		sendEmail && raiseServiceNowTicket
			? 'An email has been sent to concerned team and a ticket for the issue is Raised'
			: sendEmail
			? 'An email has been sent to concerned team'
			: raiseServiceNowTicket
			? 'A ticket for the issue is Raised'
			: '';
	return (
		<div className="ri_thanks_container">
			<img className="ri_thanks_logo" src={Spark} alt="logo" />
			<div className="ri_thanks_head">
				{' '}
				{thankyouHeading || 'Thanks for reporting the issue'}{' '}
			</div>
			<div className="ri_success_msg"> {successMessage || succMsg}</div>
			<div className="ri_final_msg">
				{' '}
				{fianlMessage || 'You issue will be resolved soon'}{' '}
			</div>
			<button className="ri_thanks_ok" onClick={closeThankYouModal}>
				{' '}
				Ok{' '}
			</button>
		</div>
	);
};

export default ThankYouModal;
