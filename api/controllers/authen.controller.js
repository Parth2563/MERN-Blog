import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signingup = async (req, res) => {
    //taking input from user and store inside variables
    const {username, email, password} = req.body;
    //handling null error
    if(!username || !email || !password || username==='' || email==='' || password==='') {
        return res.status(400).json({message : "All fields are required"});
    }
    //hashing password with 10 salting round
    const hashPassword = bcryptjs.hashSync(password, 10);
    //creating new user from schema
    const newUser = new User({username, email, password: hashPassword});

    try { // saving in database
        await newUser.save();
    } catch (error) { //handling error
        return res.status(409).json({message : error.message});
    }
    //succesful message
    res.json('Sign up Successful');
};