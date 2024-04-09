import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';

import Users from '.';

const styles = {
	textAlign: 'center',
};
const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

const stories = storiesOf('Users', module);
stories.addDecorator(withKnobs);
stories.addDecorator(CenterDecorator);
stories.add('with some label', () => {
	const content = text('Label', 'Users Page. Try changing me via Knobs...');
	return <Users onClick={action('clicked')} label={content} />;
});
