import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080/api/v1/' /* Your custom api base url */,
	/* other custom settings */
});

const GET = (uri, headers) => {
	return axiosInstance({
		method: 'get',
		url: `${uri}`,
		headers: headers || {},
		timeout: 10000, // 10 second timeout before failing
	});
};

const POST = (uri, body, headers) => {
	return axiosInstance({
		method: 'post',
		url: `${uri}`,
		headers: headers || {},
		data: body,
		timeout: 10000, // 10 second timeout before failing
	});
};

const PUT = (uri, body, headers) => {
	return axiosInstance({
		method: 'put',
		url: `${uri}`,
		headers: headers || {},
		data: body,
		timeout: 10000, // 10 second timeout before failing
	});
};

const PATCH = (uri, body, headers) => {
	return axiosInstance({
		method: 'patch',
		url: `${uri}`,
		headers: headers || {},
		data: body,
		timeout: 10000, // 10 second timeout before failing
	});
};

const DELETE = (uri, body, headers) => {
	return axiosInstance({
		method: 'delete',
		url: `${uri}`,
		headers: headers || {},
		data: body,
		timeout: 10000,
	});
};

export { GET, POST, PUT, PATCH, DELETE };
