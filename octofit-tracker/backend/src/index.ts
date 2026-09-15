import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';
import { apiUrl, port } from './server';

const app = express();
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

function registerCollectionRoutes<T extends mongoose.Document>(
  path: string,
  model: mongoose.Model<T>
) {
  app.get(path, async (_req, res) => {
    try {
      res.json(await model.find().lean());
    } catch (error) {
      console.error(`Failed to read ${path}:`, error);
      res.status(503).json({ error: 'Database unavailable' });
    }
  });

  app.post(path, async (req, res) => {
    try {
      const record = await model.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      console.error(`Failed to create ${path}:`, error);
      res.status(400).json({ error: 'Invalid request data' });
    }
  });
}

registerCollectionRoutes('/api/users', UserModel);
registerCollectionRoutes('/api/teams', TeamModel);
registerCollectionRoutes('/api/activities', ActivityModel);
registerCollectionRoutes('/api/leaderboard', LeaderboardModel);
registerCollectionRoutes('/api/workouts', WorkoutModel);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port,
    apiUrl,
  });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at 27017');

    app.listen(port, () => {
      console.log(`Octofit Tracker API listening on ${apiUrl}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
