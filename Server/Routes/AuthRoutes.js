import express from 'express';
import User from '../Controller/AuthController';
import CheckSignUp from '../Middleware/checkSignUp';

const router = express.Router();
const newAuth = new User();
router.post('/auth/signup', [CheckSignUp], newAuth.signUp);
export default router;
