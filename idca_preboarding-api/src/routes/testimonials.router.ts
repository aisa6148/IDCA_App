import express from 'express';
import TestimonialsContoller from '../controllers/testimonials.controller';

const router = express.Router();
router.post('/add', TestimonialsContoller.setTestimonialsData);
router.get('/list', TestimonialsContoller.getTestimonialsData);
router.get('/:testimonialsID', TestimonialsContoller.getTestimonialsById);
router.get('/image/:blobName', TestimonialsContoller.getImageBlobName);
router.delete('/delete-testimonials/:testimonialsID', TestimonialsContoller.deleteTestimonials);
router.put('/update-testimonials/:testimonialsID', TestimonialsContoller.updateTestimonials);
export default router;
