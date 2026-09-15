import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port,
    mongodb: mongoUri,
  });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at 27017');

    app.listen(port, () => {
      console.log(`Octofit Tracker API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
