import express from 'express';
import * as teamMemberController from '../controllers/teamMemberController.js';
import { protectWithApiKey } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/team-members', teamMemberController.getAllTeamMembers);
router.get('/team-members/:id', teamMemberController.getTeamMemberById);
router.post('/team-members', protectWithApiKey, teamMemberController.createTeamMember);
router.put('/team-members/:id', protectWithApiKey, teamMemberController.updateTeamMember);
router.delete('/team-members/:id', protectWithApiKey, teamMemberController.deleteTeamMember);

export default router;
