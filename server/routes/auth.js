import { Router } from 'express';
import authController from '../controllers/auth.js';
import validateInput from '../middlewares/validateInput.js';

const router = Router();

router.post('/signin', validateInput, authController.signin);
router.post('/signup', validateInput, authController.signup);

export default router;
