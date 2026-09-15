import mongoose, { Document, Model, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
}

export interface Team extends Document {
  name: string;
  members: string[];
}

export interface Activity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  points: number;
}

export interface LeaderboardEntry extends Document {
  userId: string;
  points: number;
}

export interface Workout extends Document {
  name: string;
  description: string;
  difficulty: string;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
});

const teamSchema = new Schema<Team>({
  name: { type: String, required: true, trim: true },
  members: { type: [String], default: [] },
});

const activitySchema = new Schema<Activity>({
  userId: { type: String, required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
});

const leaderboardEntrySchema = new Schema<LeaderboardEntry>({
  userId: { type: String, required: true },
  points: { type: Number, required: true, min: 0 },
});

const workoutSchema = new Schema<Workout>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, trim: true },
});

export const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', userSchema);
export const TeamModel: Model<Team> = mongoose.models.Team || mongoose.model<Team>('Team', teamSchema);
export const ActivityModel: Model<Activity> = mongoose.models.Activity || mongoose.model<Activity>('Activity', activitySchema);
export const LeaderboardModel: Model<LeaderboardEntry> = mongoose.models.Leaderboard || mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardEntrySchema);
export const WorkoutModel: Model<Workout> = mongoose.models.Workout || mongoose.model<Workout>('Workout', workoutSchema);