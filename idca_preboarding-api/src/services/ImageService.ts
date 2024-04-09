import * as _ from 'lodash';
import { deleteImageFromBlob, getImageFromBlob, uploadImageToBlob } from '../services/azureBlob';
export default class ImageService {
	public static async addContentImage(ID: string, image: string, imageType: string) {
		const blobName = this.getblobName(imageType, ID);
		const uploadRes = await uploadImageToBlob(blobName, image);
		return uploadRes;
	}

	public static async fetchImage(blobName) {
		const image = await getImageFromBlob(blobName);
		return image;
	}

	public static async deleteImage(imageType: string, ID: string) {
		const blobName = this.getblobName(imageType, ID);
		const image = await deleteImageFromBlob(blobName);
		return image;
	}

	public static checkImageSizeMB(filename, size = 5) {
		const buffer = Buffer.from(filename.substring(filename.indexOf(',') + 1));
		const fileKb = buffer.length / 1024;
		if (fileKb < size * 1024) {
			return true;
		} else {
			return false;
		}
	}

	private static getblobName(imageType: string, ID: string) {
		const blobName = `${imageType}-${ID}`;
		return blobName;
	}
}
