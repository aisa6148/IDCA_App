import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';

import Contact from '.';

const styles = {
	textAlign: 'center',
};
const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

const stories = storiesOf('Contact', module);
stories.addDecorator(withKnobs);
stories.addDecorator(CenterDecorator);
stories.add('with some label', () => {
	const content = text('Label', 'Contact Page. Try changing me via Knobs...');
	return <Contact onClick={action('clicked')} label={content} />;
});
