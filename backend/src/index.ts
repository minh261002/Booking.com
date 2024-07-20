import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import path from 'path';

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string).then(() => {
    console.log('Connected to MongoDB', process.env.MONGO_CONNECTION_STRING);
});

const app = express();

app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});