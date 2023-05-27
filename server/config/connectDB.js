import mongoose from 'mongoose';

const connectDB = () => {
  const MONGO_URL = process.env.MONGO_URL;
  return mongoose.connect(MONGO_URL);
};

export default connectDB;
