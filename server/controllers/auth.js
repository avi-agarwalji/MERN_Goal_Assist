import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const signin = async (req, res, next) => {
  const password = req.body.password;
  // Email is stored in lowercase.
  const email = req.body.email.toLowerCase();

  const JWT_SECRET = process.env.JWT_SECRET;

  // Trying user signin.
  try {
    // If user exists in mongoDB.
    const user = await User.findOne({ email });
    // If there is no user with the provided email: throw authentication error.
    // Showing Invalid credentials as we don't want to give any info whether the email exists in our system or not.
    if (!user)
      throw {
        name: 'AuthenticationError',
        message: 'Invalid credentials!',
      };

    // If user exists compairing the password.
    const match = await bcrypt.compare(password, user.password);

    // If password doesn't match.
    if (!match)
      throw {
        name: 'AuthenticationError',
        message: 'Invalid credentials!',
      };

    // Removing the password from the user object.
    user.password = undefined;

    // If email exists and password matches then generating the jwt token for user authentication.
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: 2 * 60 });

    // If everything went as expected, then sending the success message, user and the jwt token for user authentication.
    return res.status(200).json({ user, token });
  } catch (error) {
    // if any error occurs will go through custom error middleware.
    next(error);
  }
};

const signup = async (req, res, next) => {
  const name = req.body.name;
  // Storing the user email in lowercase only.
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  const JWT_SECRET = process.env.JWT_SECRET;

  // Trying to save user in mongoDB.
  try {
    // Creating new instance of user.
    const user = new User({ name, email, password });
    // Saving the new user in mongoDB.
    await user.save();

    // Removing the password from the newly created user.
    user.password = undefined;

    // Generating jwt token for user authentication which expires in 2 mins.
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: 2 * 60 });

    // If everything went as expected, then sending the success message, new user and the jwt token for user authentication.
    return res.status(201).json({ user, token });
  } catch (error) {
    // if any error occurs will go through custom error middleware.
    next(error);
    // When you use the throw statement inside a catch block, it throws an exception, but it does not propagate the exception to the next middleware or the global error handler.
    // The throw statement only allows you to catch and handle the exception within the same catch block.
  }
};

const authController = { signin, signup };
export default authController;
