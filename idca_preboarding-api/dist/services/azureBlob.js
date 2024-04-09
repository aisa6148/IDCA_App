"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMediaToBlob = exports.getUploadedFileFromBlob = exports.deleteImageFromBlob = exports.uploadImageToBlob = exports.getImageFromBlob = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const config_1 = __importDefault(require("../config"));
const { azImageBlobConnectionString, azImageNewsFeedBlobContainer } = config_1.default.azureBlobConfig;
const { azureFileUploadConnectionString, azureFileUploadContainer, } = config_1.default.azureBlobFileUploadConfig;
function getImageFromBlob(blobName) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageContainerClient = new storage_blob_1.ContainerClient(azImageBlobConnectionString, azImageNewsFeedBlobContainer);
        return getFromBlobAsString(imageContainerClient, blobName);
    });
}
exports.getImageFromBlob = getImageFromBlob;
function uploadImageToBlob(blobName, image) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageContainerClient = new storage_blob_1.ContainerClient(azImageBlobConnectionString, azImageNewsFeedBlobContainer);
        return uploadToBlob(imageContainerClient, blobName, image);
    });
}
exports.uploadImageToBlob = uploadImageToBlob;
function deleteImageFromBlob(blobName) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageContainerClient = new storage_blob_1.ContainerClient(azImageBlobConnectionString, azImageNewsFeedBlobContainer);
        return deleteFromBlob(imageContainerClient, blobName);
    });
}
exports.deleteImageFromBlob = deleteImageFromBlob;
function uploadToBlob(containerClient, blobName, content) {
    return __awaiter(this, void 0, void 0, function* () {
        // containerClient.exists()
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = yield blockBlobClient.upload(content, content.length);
        if (uploadBlobResponse && uploadBlobResponse.requestId) {
            return blobName;
        }
        else {
            return false;
        }
    });
}
function deleteFromBlob(containerClient, blobName) {
    return __awaiter(this, void 0, void 0, function* () {
        // containerClient.exists()
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const blobDeleteResponse = yield blockBlobClient.delete();
        if (blobDeleteResponse && blobDeleteResponse.requestId) {
            return true;
        }
        else {
            return false;
        }
    });
}
function getFromBlobAsString(containerClient, blobName) {
    return __awaiter(this, void 0, void 0, function* () {
        // containerClient.exists()
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const buffer = yield blockBlobClient.downloadToBuffer();
        return buffer.toString();
    });
}
/**
 * fetch files from blobstorage
 * @param blobName
 */
function getUploadedFileFromBlob(blobName) {
    return __awaiter(this, void 0, void 0, function* () {
        const containerClient = new storage_blob_1.ContainerClient(azureFileUploadConnectionString, azureFileUploadContainer);
        return getFileFromBlobAsBuffer(containerClient, blobName);
    });
}
exports.getUploadedFileFromBlob = getUploadedFileFromBlob;
function getFileFromBlobAsBuffer(containerClient, blobName) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const buffer = yield blockBlobClient.downloadToBuffer();
        return buffer;
    });
}
/**
 * upload file from onboard tab to azure blob storage
 * @param blobName
 * @param content
 */
function uploadMediaToBlob(blobName, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const containerClient = new storage_blob_1.ContainerClient(azureFileUploadConnectionString, azureFileUploadContainer);
        const uploadBlobResponse = yield uploadFileToBlob(containerClient, blobName, content);
        if (uploadBlobResponse) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.uploadMediaToBlob = uploadMediaToBlob;
function uploadFileToBlob(containerClient, blobName, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = yield blockBlobClient.upload(content, content.length);
        if (uploadBlobResponse && uploadBlobResponse.requestId) {
            return true;
        }
        else {
            return false;
        }
    });
}
//# sourceMappingURL=azureBlob.js.map