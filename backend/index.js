import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './configs/mongodb.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(morgan('dev'));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to TaskHub API',
  });
});

// Error middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Not found middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
