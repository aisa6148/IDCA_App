import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { Close } from '@material-ui/icons';
import 'cropperjs/dist/cropper.css';

class CropModal extends Component {
	state = {
		cropImg: '',
	};

	_crop = () => {
		// image in dataUrl
		const croppedScrenShot = this.refs.cropper.getCroppedCanvas().toDataURL();
		// this.props.updateScreenShot(croppedScrenShot);
		this.setState({ cropImg: croppedScrenShot });
	};

	render() {
		const { image, hideCropModal, updateScreenshot } = this.props;
		const { cropImg } = this.state;
		return (
			<div className="crop_container">
				<Close className="ri_close" onClick={hideCropModal} />
				<div className="ri_head crop_head"> Crop Screenshot </div>
				<Cropper
					ref={'cropper'}
					src={image}
					style={{ height: '85%', width: '100%' }}
					aspectRatio={16 / 9}
					guides={false}
					crop={this._crop}
					autoCropArea={0.6}
					viewMode={1}
				/>

				<div className="cc_btn_sec">
					<button className="cc_btn cc_cancel_btn" onClick={hideCropModal}>
						{' '}
						Cancel{' '}
					</button>
					<button className="cc_btn" onClick={() => updateScreenshot(cropImg)}>
						{' '}
						Crop & Attach{' '}
					</button>
				</div>
			</div>
		);
	}
}

export default CropModal;
