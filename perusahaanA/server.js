import 'express-async-errors';
import express from "express";
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';


// middlewares
import { authenticateUser } from './middlewares/authMiddleware.js';


// routes
import karyawanRouter from "./modules/karyawan/routes/karyawanRouter.js"
import kehadiranRouter from "./modules/kehadiran/routes/kehadiranRouter.js"

dotenv.config()
const app = express()

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test Jalan Ga Perusahaan B');
});

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "test route Perusahaan B" })
})

app.use('/api/v1/karyawan', authenticateUser, karyawanRouter);
app.use('/api/v1/kehadiran', authenticateUser, kehadiranRouter);

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

const port = 5103;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}