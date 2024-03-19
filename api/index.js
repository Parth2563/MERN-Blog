import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authenRoutes from './routes/authen.route.js';

dotenv.config();
//connectiong to database
mongoose
    .connect(process.env.MONGO, {serverSelectionTimeoutMS: 10000})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error:', error);
    });

//creating express app
const app = express();

app.use(express.json());
//starting server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

app.use('/api/user', userRoutes);
app.use('/api/authen', authenRoutes);

//adding middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});
