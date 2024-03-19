import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signingup = async (req, res, next) => {
    //taking input from user and store inside variables
    const {username, email, password} = req.body;
    //handling null error
    if(!username || !email || !password || username==='' || email==='' || password==='') {
        next(errorHandler(400, 'All fields are required'));
    }
    //hashing password with 10 salting round
    const hashPassword = bcryptjs.hashSync(password, 10);
    //creating new user from schema
    const newUser = new User({username, email, password: hashPassword});

    try { 
        await newUser.save(); // saving to database
        res.json('Sign up Successful'); //success message
    } catch (error) { //handling error
        next(error);
    }
};