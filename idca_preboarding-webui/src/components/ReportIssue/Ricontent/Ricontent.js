import React from 'react';
import { TextField } from '@material-ui/core';
import { Close, Backup, Fullscreen } from '@material-ui/icons';

const RiContent = ({
	cancel,
	riTitle,
	updateTitle,
	riDesc,
	updateRiDesc,
	captureBrowserDetails,
	disableSubmit,
	updateCaptureBrowserDetails,
	screenShotArray,
	modalSubTitleStyles,
	deleteScreenshot,
	reportIssue,
	summaryPlaceHolder,
	textStyles,
	showCropModal,
	updateUploadedFile,
	modalHeading,
	summaryLabel,
	summaryCount,
	summaryMaxCount,
	descriptionLabel,
	descriptionPlaceholder,
	descCount,
	descriptionMaxCount,
	removeAttachScreenshot,
	isAttachScreenShotOptional,
	disableAttachButtons,
	hideDeviceDetailsoption,
	hideUploadImageButton,
	hideCropScreenshotButton,
	labelStyles,
	modalMainHeadingStyles,
	modalSubTitle,
	handleRiSubmit,
	maxNumberofAttachments,
}) => {
	const maxImages = maxNumberofAttachments || 4;
	return (
		<div className="ri_content_sec">
			<Close className="ri_close" onClick={() => cancel(false)} />
			<div className="ri_content" style={removeAttachScreenshot ? { height: '370px' } : null}>
				<div
					style={modalMainHeadingStyles && modalMainHeadingStyles}
					className="ri_main_head"
				>
					{' '}
					{modalHeading || 'Report Issue'}{' '}
				</div>
				<div style={modalSubTitleStyles && modalSubTitleStyles} className="ri_main_desc">
					{modalSubTitle || 'Please let us know what is bothering you'}{' '}
				</div>
				<div className="ri_title_sec">
					<div style={labelStyles && labelStyles} className="ri_head ri_title_head">
						{' '}
						{summaryLabel ||
							'Summary'} <span className="ri_title_head_sup">*</span>{' '}
					</div>
					<TextField
						id="ri_title"
						placeholder={summaryPlaceHolder || 'Write a brief about the issue'}
						margin="normal"
						onChange={updateTitle}
						value={riTitle || ''}
						className="ri_title_cover"
						autoComplete="off"
						InputProps={textStyles && { style: textStyles }}
						inputProps={{
							maxLength: summaryMaxCount || 50,
						}}
					/>
					<div className="ri_title_count_sec">
						{' '}
						{summaryCount} / {summaryMaxCount || 50}{' '}
					</div>
				</div>
				<div style={labelStyles && labelStyles} className="ri_head">
					{' '}
					{descriptionLabel || 'Issue Description'}{' '}
				</div>
				<TextField
					id="standard-multiline-flexible"
					multiline
					rows="3"
					placeholder={
						descriptionPlaceholder || 'Write a detailed description about the issue'
					}
					margin="normal"
					onChange={updateRiDesc}
					value={riDesc || ''}
					className="ri_desc_cover"
					autoComplete="off"
					InputProps={textStyles && { style: textStyles }}
					inputProps={{
						maxLength: descriptionMaxCount || 150,
					}}
				/>
				<div className="ri_title_count_sec">
					{' '}
					{descCount} / {descriptionMaxCount || 150}{' '}
				</div>
				{!removeAttachScreenshot && (
					<div className="ri_attach_sec">
						<div style={labelStyles && labelStyles} className="ri_head">
							{' '}
							Attachments{' '}
							{!isAttachScreenShotOptional && (
								<span className="ri_title_head_sup">*</span>
							)}{' '}
						</div>
						<div className="ri_attach_text">
							{' '}
							Maximunm number of attachments: {maxImages}{' '}
						</div>
						<div className="ri_attach_options">
							{!hideUploadImageButton && (
								<span className="uplaod_cover">
									<input
										type="file"
										id="ri_file_upload"
										accept=".jpg, .png, .svg"
										onChange={updateUploadedFile}
										disabled={disableAttachButtons}
									/>
									<label
										htmlFor="ri_file_upload"
										className={
											disableAttachButtons
												? 'ri_attach_val ri_attach_val_disabled'
												: 'ri_attach_val'
										}
									>
										<Backup className="ri_file_upload_icon" />
										<span className="ri_file_upload_text">
											{' '}
											Upload Image
										</span>{' '}
									</label>
								</span>
							)}
							{/* {
                                !hideAttachFullScreenButton &&
                                <button className={disableAttachButtons ? "ri_attach_val ri_attach_val_disabled" : "ri_attach_val"} onClick={() => updateScreenShotArray('fullscreen')}> Attach Fullscreen </button>
                            } */}
							{!hideCropScreenshotButton && (
								<button
									className={
										disableAttachButtons
											? 'ri_attach_val ri_attach_val_disabled'
											: 'ri_attach_val'
									}
									onClick={showCropModal}
								>
									<Fullscreen className="ri_file_upload_icon" />
									<span className="ri_file_upload_text"> Crop Screenshot </span>
								</button>
							)}
						</div>
						{/* <div style={labelStyles && labelStyles} className="ri_head"> Attached Images </div> */}
						{screenShotArray && screenShotArray.length > 0
							? screenShotArray.map((item, index) => {
									return (
										<div
											className="ri_images_sec"
											key={`ri_images_sec${index}`}
										>
											<span className="screenshot_cover" key={index}>
												<span className="ri_img_cancel_cover">
													<Close
														className="ri_img_cancel_icon"
														onClick={() => {
															deleteScreenshot(index);
														}}
													/>
												</span>
												<img
													className="ri_attached_image"
													src={item}
													alt="screenshot"
												/>
											</span>
										</div>
									);
							  })
							: null}
					</div>
				)}
				<div
					className="ri_bd_sec"
					style={hideDeviceDetailsoption ? { visibility: 'hidden' } : null}
				>
					<input
						name="capture"
						type="checkbox"
						className="ri_bd_input"
						checked={captureBrowserDetails}
						onChange={updateCaptureBrowserDetails}
					/>
					<span className="ri_bd_text">
						{' '}
						Allow submitting your DEVICE and BROWSER details{' '}
					</span>
				</div>
				<div className="ri_submit_sec">
					<button
						onClick={reportIssue}
						className={!disableSubmit ? 'ri_submit ri_submit_active' : 'ri_submit'}
						onClick={handleRiSubmit}
					>
						{' '}
						Submit{' '}
					</button>
					<button
						onClick={reportIssue}
						className={'ri_cancel'}
						onClick={() => cancel(false)}
					>
						{' '}
						Cancel{' '}
					</button>
				</div>
			</div>
		</div>
	);
};

export default RiContent;
