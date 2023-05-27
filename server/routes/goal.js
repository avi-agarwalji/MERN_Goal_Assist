import { Router } from 'express';
import goalController from '../controllers/goal.js';
import authorizeUser from '../middlewares/authorizeUser.js';

const router = Router();

router.get('/dashboard', authorizeUser, goalController.dashboard);

export default router;
