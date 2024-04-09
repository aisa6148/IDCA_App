function fetchRedirectSpace(r) {
	if (process.env.ENV === 'prod') {
		r.internalRedirect('@prod');
	} else if (process.env.ENV === 'stage') {
		r.internalRedirect('@stage');
	} else if (process.env.ENV === 'dev') {
		r.internalRedirect('@dev');
	} else {
		r.internalRedirect('@lab');
	}
}
