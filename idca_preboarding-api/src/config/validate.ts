import { lengthCheck } from '../config/constants';
export const checkLength = (content) => {
	if (content <= lengthCheck.MAXLENGTH_250) {
		return true;
	} else {
		return false;
	}
};
