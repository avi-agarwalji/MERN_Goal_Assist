import jwt from 'jsonwebtoken';

const authorizeUser = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers['authorization'];

  // Checking if auth header is present.
  if (!authHeader)
    throw {
      name: 'AuthorizationError',
      message: 'Auth header is not provided',
    };

  const [bearer, token] = authHeader.split(' ');

  // Checking if bearer token is present in auth header.
  if (bearer !== 'Bearer')
    throw {
      name: 'AuthorizationError',
      message: 'Bearer token is not provided',
    };

  // Checking if jwt is present.
  if (!token)
    throw {
      name: 'AuthorizationError',
      message: 'JWT token is not provided',
    };

  // Validating jwt.
  jwt.verify(token, JWT_SECRET, (err, token) => {
    if (err) {
      if (err.name === 'TokenExpiredError')
        throw {
          name: 'AuthorizationError',
          message: 'Auth token is expired. Login again',
        };
      if (err.name === 'JsonWebTokenError')
        throw {
          name: 'AuthorizationError',
          message: 'Malformed token provided.',
        };
    }
    // Setting the user to current logged in user.
    req.user = token;
  });

  next();
};

export default authorizeUser;
