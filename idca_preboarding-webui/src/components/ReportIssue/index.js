import React, { Component } from 'react';
import { Report } from '@material-ui/icons';
import domtoimage from 'dom-to-image-more';
import Modal from './Modal';
import RiContent from './Ricontent/Ricontent';
import CropModal from './CropModal';
import ThankYouModal from './ThankyouModal';
import { fetchBrowserInfo } from './Utils';
import './reportissue.css';

class ReportIssue extends Component {
	state = {
		showModal: false,
		modalConent: 'main',
		riTitle: '',
		riDesc: '',
		disableSubmit: true,
		captureBrowserDetails: !this.props.hideDeviceDetailsoption,
		fullScreenShot: '',
		screenShotArray: [],
		croppedScreenshot: '',
		uploadedImage: '',
		disableAttachButtons: false,
		browserDetails: {},
		summaryCount: this.props.summaryMaxCount || 50,
		descCount: this.props.descriptionMaxCount || 150,
	};

	componentDidMount() {
		const browserDetails = fetchBrowserInfo();
		if (Object.keys(browserDetails).length > 0) {
			this.setState({ browserDetails: browserDetails });
		}
	}

	captureFullScreen = () => {
		const node = document.getElementById('root');
		const that = this;
		domtoimage
			.toPng(node)
			.then(function(dataUrl) {
				that.setState({ fullScreenShot: dataUrl });
			})
			.catch(function(error) {
				console.error('oops, something went wrong!', error);
			});
	};

	toggleModal = val => {
		if (!val) {
			this.resetStates();
		} else {
			this.captureFullScreen();
		}
		setTimeout(() => {
			this.setState({ showModal: val });
		}, 100);
	};

	updateTitle = e => {
		const text = e.target.value;
		const maxLength = this.props.summaryMaxCount || 50;
		this.setState({ riTitle: text, summaryCount: maxLength - text.trim().length }, () => {
			this.enableSubmit();
		});
	};

	updateRiDesc = e => {
		const text = e.target.value;
		const maxLength = this.props.descriptionMaxCount || 150;
		this.setState({ riDesc: text, descCount: maxLength - text.trim().length }, () => {
			this.enableSubmit();
		});
	};

	enableSubmit = () => {
		const { riTitle, screenShotArray } = this.state;
		const {
			isAttachScreenShotOptional,
			maxNumberofAttachments,
			removeAttachScreenshot,
		} = this.props;
		const maxImages = maxNumberofAttachments || 3;
		if (
			!removeAttachScreenshot &&
			!isAttachScreenShotOptional &&
			screenShotArray.length === 0
		) {
			this.setState({ disableSubmit: true });
		} else if (riTitle.trim().length < 5) {
			this.setState({ disableSubmit: true });
		} else {
			this.setState({ disableSubmit: false });
		}
		if (screenShotArray.length === maxImages) {
			this.setState({ disableAttachButtons: true });
		} else {
			this.setState({ disableAttachButtons: false });
		}
	};

	updateCaptureBrowserDetails = e => {
		const { checked } = e.target;
		if (checked) {
			this.setState({ captureBrowserDetails: true });
		} else {
			this.setState({ captureBrowserDetails: false });
		}
	};

	updateScreenShotArray = val => {
		const {
			fullScreenShot,
			screenShotArray,
			croppedScreenshot,
			uploadedImage,
			disableAttachButtons,
		} = this.state;
		if (disableAttachButtons) {
			return;
		}
		if (val === 'fullscreen') {
			const arr = screenShotArray;
			arr.push(fullScreenShot);
			this.setState({ screenShotArray: arr }, () => this.enableSubmit());
		} else if (val === 'cropscreenshot') {
			const arr = screenShotArray;
			arr.push(croppedScreenshot);
			this.setState({ screenShotArray: arr }, () => this.enableSubmit());
		} else if (val === 'uploadimage') {
			const arr = screenShotArray;
			arr.push(uploadedImage);
			this.setState({ screenShotArray: arr }, () => this.enableSubmit());
		}
	};

	deleteScreenshot = ind => {
		const { screenShotArray } = this.state;
		screenShotArray.splice(ind, 1);
		this.setState({ screenShotArray }, () => this.enableSubmit());
	};

	showCropModal = () => {
		const { disableAttachButtons } = this.state;
		if (disableAttachButtons) {
			return;
		}
		this.setState({ modalConent: 'crop' });
	};

	hideCropModal = () => {
		this.setState({ modalConent: 'main', croppedScreenshot: '' });
	};

	updateScreenshot = img => {
		this.setState({ croppedScreenshot: img }, () => {
			this.updateScreenShotArray('cropscreenshot');
			this.setState({ modalConent: 'main' });
		});
	};

	reportIssue = () => {
		const {
			riTitle,
			riDesc,
			screenShotArray,
			captureBrowserDetails,
			disableSubmit,
		} = this.state;
		if (!disableSubmit) {
			this.setState({ modalConent: 'thankyou' });
		}
	};

	resetStates = () => {
		this.setState({
			showModal: false,
			modalConent: 'main',
			riTitle: '',
			summaryCount: this.props.summaryMaxCount || 50,
			descCount: this.props.descriptionMaxCount || 150,
			riDesc: '',
			disableSubmit: true,
			captureBrowserDetails: true,
			fullScreenShot: '',
			screenShotArray: [],
			croppedScreenshot: '',
			uploadedImage: '',
			disableAttachButtons: false,
		});
	};

	closeThankYouModal = () => {
		this.resetStates();
		this.toggleModal(false);
	};

	updateUploadedFile = e => {
		const img = e.target.files[0];
		const reader = new FileReader();
		let baseString;
		const that = this;
		reader.onloadend = function() {
			baseString = reader.result;
			that.setState({ uploadedImage: baseString }, () => {
				that.updateScreenShotArray('uploadimage');
			});
		};
		reader.readAsDataURL(img);
	};

	handleRiSubmit = () => {
		const {
			riTitle,
			riDesc,
			screenShotArray,
			browserDetails,
			disableSubmit,
			captureBrowserDetails,
		} = this.state;
		const { riSubmitCallback } = this.props;
		const details = captureBrowserDetails ? browserDetails : null;
		if (!disableSubmit && riSubmitCallback) {
			this.toggleModal(false);
			riSubmitCallback(riTitle, riDesc, screenShotArray, details);
		} else {
			return null;
		}
	};

	render() {
		const { MainIcon, mainIconStyles } = this.props;
		const {
			showModal,
			modalConent,
			riTitle,
			riDesc,
			disableSubmit,
			captureBrowserDetails,
			screenShotArray,
			fullScreenShot,
			disableAttachButtons,
			summaryCount,
			descCount,
		} = this.state;
		return (
			<div className="ri_main_container">
				<div className="ri_btn_cover" onClick={() => this.toggleModal(true)}>
					{MainIcon ? (
						<MainIcon className="ri_icon" style={mainIconStyles && mainIconStyles} />
					) : (
						<Report className="ri_icon" style={mainIconStyles && mainIconStyles} />
					)}
				</div>
				<Modal showClose={false} show={showModal} cancel={this.toggleModal} {...this.props}>
					{modalConent === 'main' && (
						<RiContent
							{...this.props}
							cancel={this.toggleModal}
							updateTitle={this.updateTitle}
							riTitle={riTitle}
							riDesc={riDesc}
							updateRiDesc={this.updateRiDesc}
							disableSubmit={disableSubmit}
							captureBrowserDetails={captureBrowserDetails}
							updateCaptureBrowserDetails={this.updateCaptureBrowserDetails}
							screenShotArray={screenShotArray}
							updateScreenShotArray={this.updateScreenShotArray}
							deleteScreenshot={this.deleteScreenshot}
							reportIssue={this.reportIssue}
							showCropModal={this.showCropModal}
							updateUploadedFile={this.updateUploadedFile}
							disableAttachButtons={disableAttachButtons}
							handleRiSubmit={this.handleRiSubmit}
							summaryCount={summaryCount}
							descCount={descCount}
						/>
					)}
					{modalConent === 'thankyou' && (
						<ThankYouModal
							{...this.props}
							closeThankYouModal={this.closeThankYouModal}
						/>
					)}
				</Modal>
				{modalConent === 'crop' && (
					<div className="ri_crop_modal">
						<CropModal
							image={fullScreenShot}
							updateScreenshot={this.updateScreenshot}
							hideCropModal={this.hideCropModal}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default ReportIssue;
