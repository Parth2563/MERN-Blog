import express from 'express';
import {signingup, login, Google} from '../controllers/authen.controller.js';

const router = express.Router();

router.post('/signingup', signingup);
router.post('/login', login);
router.post('/Google', Google);

export default router;