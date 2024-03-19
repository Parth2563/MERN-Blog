import express from 'express';
import {signingup, login} from '../controllers/authen.controller.js';

const router = express.Router();

router.post('/signingup', signingup);
router.post('/login', login);

export default router;