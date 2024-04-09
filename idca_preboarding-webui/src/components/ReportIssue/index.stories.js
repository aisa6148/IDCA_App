import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, object, Function } from '@storybook/addon-knobs';
import { BugReport } from '@material-ui/icons';
import ReportIssue from '.';

// const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

const stories = storiesOf('Distribution List/ReportIssue', module);
stories.addDecorator(withKnobs);
// stories.addDecorator(CenterDecorator)
stories.add('Basic Report Issue Component', () => {
	const defaultValue = {};

	const modalHeading = text('modalHeading', 'Report Issues');
	const modalMainHeadingStyles = object('modalMainHeadingStyles', {});

	const modalSubTitle = text('modalSubTitle', '');
	const modalSubTitleStyles = object('modalSubTitleStyles', {});

	const labelStyles = object('labelStyles', {});
	const textStyles = object('textStyles', {});

	const summaryLabel = text('summaryLabel', 'Summary');
	const summaryPlaceHolder = text('summaryPlaceHolder', '');
	const summaryMaxCount = number('summaryMaxCount', 3);

	const descriptionLabel = text('descriptionLabel', 'Description');
	const descriptionPlaceholder = text('descriptionPlaceholder', '');
	const descriptionMaxCount = number('descriptionMaxCount', 20);

	const removeAttachScreenshot = boolean('removeAttachScreenshot', false);
	const hideUploadImageButton = boolean('hideUploadImageButton', false);
	const hideCropScreenshotButton = boolean('hideCropScreenshotButton', false);
	const isAttachScreenShotOptional = boolean('isAttachScreenShotOptional', false);
	const maxNumberofAttachments = number('maxNumberofAttachments', 40);

	const hideDeviceDetailsoption = boolean('hideDeviceDetailsoption', false);

	const riSubmitCallback = object(
		'riSubmitCallback',
		(riTitle, riDesc, screenShotArray, details) => {
			console.log('testing', riTitle, riDesc, screenShotArray, details);
		},
	);

	const MainIcon = object('MainIcon');
	const mainIconStyles = object('mainIconStyles', {});
	return (
		<ReportIssue
			modalHeading={modalHeading}
			modalMainHeadingStyles={modalMainHeadingStyles}
			modalSubTitle={modalSubTitle}
			modalSubTitleStyles={modalSubTitleStyles}
			summaryLabel={summaryLabel}
			summaryPlaceHolder={summaryPlaceHolder}
			summaryMaxCount={summaryMaxCount}
			descriptionLabel={descriptionLabel}
			descriptionPlaceholder={descriptionPlaceholder}
			descriptionMaxCount={descriptionMaxCount}
			labelStyles={labelStyles}
			textStyles={textStyles}
			removeAttachScreenshot={removeAttachScreenshot}
			hideUploadImageButton={hideUploadImageButton}
			hideCropScreenshotButton={hideCropScreenshotButton}
			isAttachScreenShotOptional={isAttachScreenShotOptional}
			// maxNumberofAttachments={4}
			maxNumberofAttachments={maxNumberofAttachments}
			hideDeviceDetailsoption={hideDeviceDetailsoption}
			riSubmitCallback={riSubmitCallback}
			MainIcon={MainIcon}
			mainIconStyles={mainIconStyles}
		/>
	);
});
