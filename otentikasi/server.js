import 'express-async-errors';
import express from "express";
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';


// routes
import authRouter from './routes/authRouter.js';


dotenv.config()
const app = express()

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test Jalan Ga Autentikasi');
});

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "test route Autentikasi" })
})

app.use('/api/v1/auth', authRouter);


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

const port = 5101;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}