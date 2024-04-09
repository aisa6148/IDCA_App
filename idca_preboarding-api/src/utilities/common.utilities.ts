export const hasLowerCase = (str: string) => /[a-z]/.test(str);
export const hasUpperCase = (str: string) => /[A-Z]/.test(str);
export const hasNumbers = (str: string) => /\d/.test(str);
export const hasSpecialCharcaters = (str: string) => /\W|_/g.test(str);

export const CHARSET = {
	lowerCase: 'abcdefghijklmnopqrstuvwxyz',
	upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	digits: '0123456789',
	characters: '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\',
};

export const daysBetweenDates = (dateString) => {
	const today = new Date().valueOf();
	const startdate = new Date(dateString).valueOf();
	const timeDiff = startdate - today;
	const noOfDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	return today > startdate ? 0 - noOfDays  : noOfDays;
};

// Input - 2021-06-01T00:00:00.000Z; Output - June 1, 2021
export const formatDateForUI = (dateString) => {
	const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'];
	const date = new Date(dateString);
	const month = monthList[date.getMonth()];
	const day = date.getDay() - 1;
	return month + ' ' + day + ', ' + date.getFullYear();
};
