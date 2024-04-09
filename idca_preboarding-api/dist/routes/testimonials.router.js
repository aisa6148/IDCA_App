"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testimonials_controller_1 = __importDefault(require("../controllers/testimonials.controller"));
const router = express_1.default.Router();
router.post('/add', testimonials_controller_1.default.setTestimonialsData);
router.get('/list', testimonials_controller_1.default.getTestimonialsData);
router.get('/:testimonialsID', testimonials_controller_1.default.getTestimonialsById);
router.get('/image/:blobName', testimonials_controller_1.default.getImageBlobName);
router.delete('/delete-testimonials/:testimonialsID', testimonials_controller_1.default.deleteTestimonials);
router.put('/update-testimonials/:testimonialsID', testimonials_controller_1.default.updateTestimonials);
exports.default = router;
//# sourceMappingURL=testimonials.router.js.map