import express from "express";
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';


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

const port = 5104;
try {
    // await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}