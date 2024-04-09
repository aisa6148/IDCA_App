import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

const Notification = props => {
	const { mappedErrorMessages, mappedSuccessMessages, mappedNotifications } = props;
	return (
		<SnackbarProvider maxSnack={3}>
			<div>
				{mappedErrorMessages.map(message => (
					<Notify
						message={message.message}
						variant={'error'}
						remove={() => {
							props.mappedRemoveErrorMessage(message.id);
						}}
						key={message.id}
					/>
				))}
				{mappedSuccessMessages.map(message => (
					<Notify
						message={message.message}
						variant={'success'}
						remove={() => {
							props.mappedRemoveSuccessMessage(message.id);
						}}
						id={message.id}
						key={message.id}
					/>
				))}
				{mappedNotifications.map(message => (
					<Notify
						message={message.message}
						variant={'info'}
						remove={() => {
							props.mappedRemoveNotificationMessage(message.id);
						}}
						id={message.id}
						key={message.id}
					/>
				))}
			</div>
		</SnackbarProvider>
	);
};

export default Notification;

const Notify = props => {
	const { enqueueSnackbar } = useSnackbar();
	enqueueSnackbar(props.message, { variant: props.variant });
	props.remove();
	return <div key={props.id} />;
};
