// Handles MongoDB validation Errors
const errorHandler = (err, req, res, next) => {
  let error = {};
  let status = 500;

  // Checking if there is any validation error.
  // 1. All fields required.
  // 2. Valid Email.
  // 3. Password minlength 6.
  if (err.name === 'ValidationError') {
    error.message = err.message;
    status = 400;
  }

  // Checking if email already exists.(This come through mongoDB validation)
  if (err.code === 11000) {
    error.message = 'Please choose another email!';
    status = 400;
  }

  // Checking Authentication error.
  // 1. Email exists.
  // 2. Password matches.
  if (err.name === 'AuthenticationError') {
    error.message = err.message;
    status = 401;
  }

  // Checking Authorization error.
  // 1. Auth header not set.
  // 2. Auth token not Provided.
  // 3. Invalid auth token (Expired and Distorted).
  if (err.name === 'AuthorizationError') {
    error.message = err.message;
    status = 403;
  }

  // Default error.
  if (status === 500) {
    error.message = err.message;
    error.stack = err.stack;
  }

  return res.status(status).json({ error });
};

export default errorHandler;
