import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
const storage = multer.memoryStorage();
import { read } from 'xlsx';
export const upload = multer({ storage });

class FileHandler {
	public static parseXLSXToLocal(req: Request, res: Response, next: NextFunction) {
		try {
			res.locals.workBook = read(req.file.buffer, {
				type: 'buffer',
				cellDates: true,
				dateNF: 'mm/dd/yyyy;@',
			});
			next();
		} catch (error) {
			res.json({
				status: 'failure',
				message: 'Could not find File',
			}).status(200);
		}
	}
}

export default FileHandler;
