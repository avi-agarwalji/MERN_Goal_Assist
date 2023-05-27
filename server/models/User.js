import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Hasing the password before saving it in database.
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified) {
    return next();
  }

  // Hashing user password.
  try {
    // Generating salt and hashed password.
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Saving hashed password.
    user.password = hashedPassword;
    return next();
  } catch (error) {
    next(error);
  }
});

const User = model('User', userSchema);
export default User;
