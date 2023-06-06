import Goal from '../models/Goal.js';

const createGoal = async (req, res, next) => {
  try {
    // Getting data from request body.
    const { title, description } = req.body;

    // Getting currently logged in user id which is set in req.user by authorizeUser middleware.
    const user = req.user.id;

    // If in any case, req.user is not set by authorizeUser middleaware.
    if (!user)
      throw { message: 'Not able to find user. Please try signin again' };

    // Creating and saving a goal in mongoDB.
    const goal = await Goal.create({
      title,
      description,
      user, // Assigning the logged-in user as the owner of the goal.
    });

    // Sending the newly created goal in a response.
    return res.status(201).json({ goal });
  } catch (error) {
    // Catching any validation error or error occured in try block.
    next(error);
  }
};

const fetchGoals = async (req, res, next) => {
  try {
    // Getting currently logged in user id which is set in req.user by authorizeUser middleware.
    const user = req.user.id;

    // If in any case, req.user is not set by authorizeUser middleaware.
    if (!user)
      throw { message: 'Not able to find user. Please try signin again' };

    // Fetching all the goals for currently logged in user.
    const goals = await Goal.find({ user });

    // Return empty error if no goal for currently logged in user.
    // Otherwise return an array of goals.
    if (goals) return res.status(200).send(goals);
  } catch (error) {
    // Catching any validation error or error occured in try block.

    next(error);
  }
};

const fetchGoalByID = async (req, res, next) => {
  try {
    // Getting goal id from url id parameter.
    const { id } = req.params;

    // Getting currently logged in user id which is set in req.user by authorizeUser middleware.
    if (!req.user) throw { message: 'Not able to find user.' };

    // Check if goal exists with the provided id.
    const goal = await Goal.findById(id).populate('user');
    if (!goal) throw { message: 'Not able to find goal.' };

    // Check if the currently logged in user is same as goal user.
    if (req.user.id !== goal.user.id)
      throw { message: 'You are not allowed to view this goal.' };

    // If goal exists and created by the currently logged in user then sending it in response.
    return res.status(200).json(goal);
  } catch (error) {
    // Catching any validation error or error occured in try block.
    next(error);
  }
};

const updateGoal = async (req, res, next) => {
  try {
    // Getting goal id (which needs to be updated) from url id.
    const { id } = req.params;

    // If in any case, req.user is not set by authorizeUser middleaware.
    if (!req.user)
      throw { message: 'Not able to find user. Please try signin again' };

    // Check if goal exists with the provided id.
    const goal = await Goal.findById(id).populate('user');
    if (!goal) throw { message: 'Not able to find goal.' };

    // Check if the currently logged in user is same as goal user.
    if (req.user.id !== goal.user.id)
      throw { message: 'You are not allowed to view this goal.' };

    // Updating and saving a goal in mongoDB.
    const result = await Goal.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (result) return res.status(200).json(result);
    else throw { message: 'Goal not updated. Try again !' };
    // Sending the newly created goal in a response.
  } catch (error) {
    // Catching any validation error or error occured in try block.
    next(error);
  }
};

const deleteGoal = async (req, res, next) => {
  try {
    // Getting goal id (which needs to be delted) from url id.
    const { id } = req.params;

    // Getting currently logged in user id which is set in req.user by authorizeUser middleware.
    if (!req.user) throw { message: 'Not able to find user.' };

    // Check if goal exists with the provided id.
    const goal = await Goal.findById(id).populate('user');
    if (!goal) throw { message: 'Not able to find goal.' };

    // Check if the currently logged in user is same as goal user.
    if (req.user.id !== goal.user.id)
      throw { message: 'You are not allowed to delete this goal.' };

    // If goal exists and created by the currently logged in user then deleteing it.
    const deletedGoal = await Goal.findByIdAndDelete(id);

    // Sending the deleted goal in a response.
    if (deletedGoal) return res.status(200).json(deletedGoal);
    else throw { message: 'Goal not deleted. Try again !' };
  } catch (error) {
    // Catching any validation error or error occured in try block.
    next(error);
  }
};

const goalController = {
  fetchGoals,
  createGoal,
  deleteGoal,
  fetchGoalByID,
  updateGoal,
};

export default goalController;
