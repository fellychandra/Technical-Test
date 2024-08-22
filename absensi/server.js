import 'express-async-errors';
import express from "express";
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// middlewares
import { authenticateUser } from './middlewares/authMiddleware.js';

// routes
import kehadiranRouter from "./routes/kehadiranRouter.js"

dotenv.config()
const app = express()

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test Jalan Ga Absensi');
});

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "test route Absensi" })
})

app.use('/api/v1/kehadiran', authenticateUser, kehadiranRouter);

const port = 5102;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}