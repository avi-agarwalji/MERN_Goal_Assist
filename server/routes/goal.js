import { Router } from 'express';
import goalController from '../controllers/goal.js';
import validateInput from '../middlewares/validateInput.js';
import authorizeUser from '../middlewares/authorizeUser.js';

const router = Router();

router.get('/dashboard', authorizeUser, goalController.dashboard);
router.post('/', validateInput, authorizeUser, goalController.createGoal);

export default router;
