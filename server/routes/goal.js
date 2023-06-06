import { Router } from 'express';
import goalController from '../controllers/goal.js';
import validateInput from '../middlewares/validateInput.js';
import authorizeUser from '../middlewares/authorizeUser.js';

const router = Router();

// create a goal for the currently logged in  user.
router.post('/', validateInput, authorizeUser, goalController.createGoal);

// display all the goals for the currently logged in  user.
router.get('/', authorizeUser, goalController.fetchGoals);

// get a goal whose id is provided in the url.
router.get('/:id', authorizeUser, goalController.fetchGoalByID);

// update goal whose id is provided in the url if logged in user is same as goal's user.
router.put('/:id', validateInput, authorizeUser, goalController.updateGoal);

// delete goal whose id is provided in the url if logged in user is same as goal's user.
router.delete('/:id', authorizeUser, goalController.deleteGoal);

export default router;
