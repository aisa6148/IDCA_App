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
Object.defineProperty(exports, "__esModule", { value: true });
const azureBlob_1 = require("../services/azureBlob");
class ImageService {
    static addContentImage(ID, image, imageType) {
        return __awaiter(this, void 0, void 0, function* () {
            const blobName = this.getblobName(imageType, ID);
            const uploadRes = yield azureBlob_1.uploadImageToBlob(blobName, image);
            return uploadRes;
        });
    }
    static fetchImage(blobName) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield azureBlob_1.getImageFromBlob(blobName);
            return image;
        });
    }
    static deleteImage(imageType, ID) {
        return __awaiter(this, void 0, void 0, function* () {
            const blobName = this.getblobName(imageType, ID);
            const image = yield azureBlob_1.deleteImageFromBlob(blobName);
            return image;
        });
    }
    static checkImageSizeMB(filename, size = 5) {
        const buffer = Buffer.from(filename.substring(filename.indexOf(',') + 1));
        const fileKb = buffer.length / 1024;
        if (fileKb < size * 1024) {
            return true;
        }
        else {
            return false;
        }
    }
    static getblobName(imageType, ID) {
        const blobName = `${imageType}-${ID}`;
        return blobName;
    }
}
exports.default = ImageService;
//# sourceMappingURL=ImageService.js.map