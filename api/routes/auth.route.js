import express from 'express';
import {signup} from '..controllers/auth.controlle.js';

const router = express.Router();

router.post('/signup', signup)

export default router;