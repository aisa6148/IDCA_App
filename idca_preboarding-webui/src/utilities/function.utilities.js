export const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) {
		return '0 Bytes';
	}

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export function arraymove(arr, fromIndex, toIndex) {
	const copyArr = arr;
	const element = copyArr[fromIndex];
	copyArr.splice(fromIndex, 1);
	copyArr.splice(toIndex, 0, element);
	return copyArr;
}
