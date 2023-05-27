const validateInput = (req, res, next) => {
  const data = req.body;

  // Check if any of the value is empty in the request body.
  const isEmpty = Object.values(data).some(
    (value) => value === '' || value === null
  );
  if (isEmpty)
    throw {
      name: 'ValidationError',
      message: 'All fields are required!',
    };

  // Check if email is valid or not.
  if (data.email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.email.match(emailRegex))
      throw {
        name: 'ValidationError',
        message: 'Please enter a valid email!',
      };
  }

  // Check the length of password.(min:6)
  if (data.password) {
    if (data.password.length < 6)
      throw {
        name: 'ValidationError',
        message: 'Password must contain atleast 6 characters',
      };
  }

  next();
};

export default validateInput;
