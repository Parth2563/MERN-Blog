import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signingup = async (req, res, next) => {
    //taking input from user and store inside variables
    const {username, email, password} = req.body;
    //handling null error
    if(!username || !email || !password || username==='' || email==='' || password==='') {
        next(errorHandler(400, 'All fields are required'));
    }
    //hashing password with 10 salting round
    const hashPassword = await bcryptjs.hashSync(password, 10);
    //creating new user from schema
    const newUser = new User({username, email, password: hashPassword});
    
    try { 
        await newUser.save(); // saving to database
        res.json('Sign up Successful'); //success message
    } catch (error) { //handling error
        next(error);
    }
};

export const login = async (req, res, next) => {
    const {email, password} = req.body; //storing input from usee

    if(!email || !password || email==='' || password==='') { //handling empty field error
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({email}); //finding user from the database
        if(!validUser) { //handling invalid email error
            return next(errorHandler(404, 'Invalid Username'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password); //comparing password
        if(!validPassword) { //handling invalid password error
            return next(errorHandler(400, 'Invalid Password'));
        }
        
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);//creating token

        const {password: pass, ...rest} = validUser._doc; //removing password from user object

        res.status(200).cookie('access_token', token, { //storing token in cookie
            httpOnly: true
        }).json(rest);
    } catch (error) { //handling error
        next(error);
    }
};