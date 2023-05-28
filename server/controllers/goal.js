import Goal from '../models/Goal.js';

const dashboard = async (req, res, next) => {
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
    res.status(201).json({ goal });
  } catch (error) {
    // Catching any validation error or error occured in try block.
    next(error);
  }
};

const goalController = { dashboard, createGoal };

export default goalController;
