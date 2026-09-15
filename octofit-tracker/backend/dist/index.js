"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const server_1 = require("./server");
const app = (0, express_1.default)();
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
function registerCollectionRoutes(path, model) {
    app.get(path, async (_req, res) => {
        try {
            res.json(await model.find().lean());
        }
        catch (error) {
            console.error(`Failed to read ${path}:`, error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.post(path, async (req, res) => {
        try {
            const record = await model.create(req.body);
            res.status(201).json(record);
        }
        catch (error) {
            console.error(`Failed to create ${path}:`, error);
            res.status(400).json({ error: 'Invalid request data' });
        }
    });
}
registerCollectionRoutes('/api/users', models_1.UserModel);
registerCollectionRoutes('/api/teams', models_1.TeamModel);
registerCollectionRoutes('/api/activities', models_1.ActivityModel);
registerCollectionRoutes('/api/leaderboard', models_1.LeaderboardModel);
registerCollectionRoutes('/api/workouts', models_1.WorkoutModel);
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        port: server_1.port,
        apiUrl: server_1.apiUrl,
    });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB at 27017');
        app.listen(server_1.port, () => {
            console.log(`Octofit Tracker API listening on ${server_1.apiUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}
startServer();
