import express from 'express';
import * as testimonialController from '../controllers/testimonialController.js';
import { protectWithApiKey } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/testimonials', testimonialController.getAllTestimonials);
router.get('/testimonials/:id', testimonialController.getTestimonialById);
router.post('/testimonials', protectWithApiKey, testimonialController.createTestimonial);
router.put('/testimonials/:id', protectWithApiKey, testimonialController.updateTestimonial);
router.delete('/testimonials/:id', protectWithApiKey, testimonialController.deleteTestimonial);

export default router;
