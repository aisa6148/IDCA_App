"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const xlsx_1 = require("xlsx");
exports.upload = multer_1.default({ storage });
class FileHandler {
    static parseXLSXToLocal(req, res, next) {
        try {
            res.locals.workBook = xlsx_1.read(req.file.buffer, {
                type: 'buffer',
                cellDates: true,
                dateNF: 'mm/dd/yyyy;@',
            });
            next();
        }
        catch (error) {
            res.json({
                status: 'failure',
                message: 'Could not find File',
            }).status(200);
        }
    }
}
exports.default = FileHandler;
//# sourceMappingURL=file.controller.js.map