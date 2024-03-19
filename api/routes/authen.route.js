import express from 'express';
import {signingup} from '../controllers/authen.controller.js';

const router = express.Router();

router.post('/signingup', signingup);

export default router;