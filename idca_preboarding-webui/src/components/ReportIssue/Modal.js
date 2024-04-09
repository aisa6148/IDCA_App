import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Close } from '@material-ui/icons';

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarPic: null,
		};
	}

	render() {
		const { show, showClose, cancel } = this.props;
		return (
			<React.Fragment>
				{show ? <div className="Backdrop" /> : null}
				<div
					className="ModalCover"
					style={{
						transform: show ? 'translateY(0)' : 'translateY(-130vh)',
						opacity: show ? '1' : '0',
					}}
				>
					<div className="Modal">
						{showClose ? (
							<span
								className="modal_close_btn"
								style={{
									position: 'absolute',
									top: '-75px',
									right: '12px',
									cursor: 'pointer',
								}}
								onClick={cancel}
							>
								{' '}
								<Close />{' '}
							</span>
						) : null}
						{this.props.children}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Modal.propTypes = {
	show: PropTypes.bool,
	cancel: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
	showClose: PropTypes.bool,
};

export default Modal;
