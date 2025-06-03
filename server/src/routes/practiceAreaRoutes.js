import express from 'express';
import * as practiceAreaController from '../controllers/practiceAreaController.js';
import { protectWithApiKey } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/practice-areas', practiceAreaController.getAllPracticeAreas);
router.get('/practice-areas/:id', practiceAreaController.getPracticeAreaById);
router.post('/practice-areas', protectWithApiKey, practiceAreaController.createPracticeArea);
router.put('/practice-areas/:id', protectWithApiKey, practiceAreaController.updatePracticeArea);
router.delete('/practice-areas/:id', protectWithApiKey, practiceAreaController.deletePracticeArea);

export default router;
