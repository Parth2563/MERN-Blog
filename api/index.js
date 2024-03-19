import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authenRoutes from './routes/authen.route.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO, {serverSelectionTimeoutMS: 10000})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error:', error);
    });


const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

app.use('/api/user', userRoutes);
app.use('/api/authen', authenRoutes);
