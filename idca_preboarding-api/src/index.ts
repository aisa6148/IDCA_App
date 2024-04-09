/* tslint:disable */
if (!process.env.ENV) {
	require('dotenv').config();
} else {
	const config = require('./config').default;
}

async function initApp() {
	try {
		require('./db/connection').connectDB();
		require('./db/SqlDatabaseConnection').dbConnectionInitialize;
		require('./app').default;
	} catch (error) {
		console.error(error);
	}
}

initApp();
