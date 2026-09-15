import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      { username: 'maya.runner', email: 'maya.runner@mergington.edu' },
      { username: 'noah.strong', email: 'noah.strong@mergington.edu' },
    ]);

    await TeamModel.insertMany([
      { name: 'Trail Blazers', members: [users[0].id] },
      { name: 'Strength Squad', members: [users[1].id] },
    ]);

    await ActivityModel.insertMany([
      { userId: users[0].id, type: 'running', durationMinutes: 30, points: 45 },
      { userId: users[0].id, type: 'walking', durationMinutes: 25, points: 20 },
      { userId: users[1].id, type: 'strength training', durationMinutes: 40, points: 50 },
    ]);

    await LeaderboardModel.insertMany([
      { userId: users[1].id, points: 50 },
      { userId: users[0].id, points: 65 },
    ]);

    await WorkoutModel.insertMany([
      {
        name: 'Starter Cardio Circuit',
        description: 'A 20-minute rotation of brisk movement and recovery intervals.',
        difficulty: 'beginner',
      },
      {
        name: 'Core and Balance',
        description: 'Controlled core exercises that build stability and body awareness.',
        difficulty: 'intermediate',
      },
      {
        name: 'Full-Body Challenge',
        description: 'A structured strength session for students ready to level up.',
        difficulty: 'advanced',
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete: 2 users, 2 teams, 3 activities, 2 leaderboard entries, 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
