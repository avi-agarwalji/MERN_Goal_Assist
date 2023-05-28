import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';

dotenv.config();

import connectDB from './config/connectDB.js';
import authRoutes from './routes/auth.js';
import goalRoutes from './routes/goal.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors());

// Getting environment variables
const PORT = process.env.PORT || 5000;

// Defining app routes
app.use('/api/auth', authRoutes);
app.use('/api/goal', goalRoutes);

// Setting up the server if the connection to mongo database is successfull
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Connected to MongoDB. Server is running on PORT: ${PORT}`.rainbow.bold
          .underline
      )
    );
  })
  .catch((error) => {
    console.error('MongoDB connection error'.red, error);
    process.exit(1);
  });

// Registering custom error handler
app.use(errorHandler);
