// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import userRoutes from './routes/userRoutes.js';
// import cardDetailsRoutes from './routes/cardDetailsRoutes.js';
// import cors from 'cors';

// const port = process.env.PORT || 5000;

// connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use('/api/users', userRoutes);
// app.use('/api/cardDetails', cardDetailsRoutes); 

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, '/frontend/dist')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

// // process.on('unhandledRejection', (reason, promise) => {
// //   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// //   // Handle or log the error here
// // });


// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`));

import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cardDetailsRoutes from './routes/cardDetailsRoutes.js';
import cors from 'cors';
import session from 'express-session'; // Add this import for session management
import passport from 'passport'; // Import passport here

// const express = require('express');
// const app = express();

// // Enable detailed error logs
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Internal Server Error');
// });

import initializePassport from './config/passportConfig.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Express app middleware setup
app.use(session({ secret: 'my-secret-key', resave: false, saveUninitialized: false })); // Initialize session before passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
initializePassport(passport);

app.use('/api/users', userRoutes);
app.use('/api/cardDetails', cardDetailsRoutes); 

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
