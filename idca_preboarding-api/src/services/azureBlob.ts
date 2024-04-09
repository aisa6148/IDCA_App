import { ContainerClient } from '@azure/storage-blob';
import config from '../config';
const { azImageBlobConnectionString, azImageNewsFeedBlobContainer } = config.azureBlobConfig;
const {
	azureFileUploadConnectionString,
	azureFileUploadContainer,
} = config.azureBlobFileUploadConfig;

export async function getImageFromBlob(blobName: string) {
	const imageContainerClient = new ContainerClient(
		azImageBlobConnectionString,
		azImageNewsFeedBlobContainer,
	);
	return getFromBlobAsString(imageContainerClient, blobName);
}
export async function uploadImageToBlob(blobName: string, image: string) {
	const imageContainerClient = new ContainerClient(
		azImageBlobConnectionString,
		azImageNewsFeedBlobContainer,
	);
	return uploadToBlob(imageContainerClient, blobName, image);
}

export async function deleteImageFromBlob(blobName: string) {
	const imageContainerClient = new ContainerClient(
		azImageBlobConnectionString,
		azImageNewsFeedBlobContainer,
	);
	return deleteFromBlob(imageContainerClient, blobName);
}

async function uploadToBlob(containerClient: ContainerClient, blobName: string, content: string) {
	// containerClient.exists()
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
	if (uploadBlobResponse && uploadBlobResponse.requestId) {
		return blobName;
	} else {
		return false;
	}
}

async function deleteFromBlob(containerClient: ContainerClient, blobName: string) {
	// containerClient.exists()
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	const blobDeleteResponse = await blockBlobClient.delete();
	if (blobDeleteResponse && blobDeleteResponse.requestId) {
		return true;
	} else {
		return false;
	}
}
async function getFromBlobAsString(containerClient: ContainerClient, blobName: string) {
	// containerClient.exists()
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	const buffer = await blockBlobClient.downloadToBuffer();
	return buffer.toString();
}

/**
 * fetch files from blobstorage
 * @param blobName
 */
export async function getUploadedFileFromBlob(blobName: string) {
	const containerClient = new ContainerClient(
		azureFileUploadConnectionString,
		azureFileUploadContainer,
	);
	return getFileFromBlobAsBuffer(containerClient, blobName);
}

async function getFileFromBlobAsBuffer(containerClient: ContainerClient, blobName: string) {
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	const buffer = await blockBlobClient.downloadToBuffer();
	return buffer;
}

/**
 * upload file from onboard tab to azure blob storage
 * @param blobName
 * @param content
 */
export async function uploadMediaToBlob(blobName: string, content: Buffer) {
	const containerClient = new ContainerClient(
		azureFileUploadConnectionString,
		azureFileUploadContainer,
	);
	const uploadBlobResponse = await uploadFileToBlob(containerClient, blobName, content);
	if (uploadBlobResponse) {
		return true;
	} else {
		return false;
	}
}
async function uploadFileToBlob(
	containerClient: ContainerClient,
	blobName: string,
	content: Buffer,
) {
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
	if (uploadBlobResponse && uploadBlobResponse.requestId) {
		return true;
	} else {
		return false;
	}
}
