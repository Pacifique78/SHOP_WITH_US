import express from 'express';
import User from '../Controller/AuthController';
import CheckSignUp from '../Middleware/checkSignUp';
import checkToken from '../Middleware/checkToken';
import checkVerificationCode from '../Middleware/checkVerficationCode';
import checkSignIn from '../Middleware/checkSignIn';

const router = express.Router();
const newAuth = new User();
router.post('/auth/signup', [CheckSignUp], newAuth.signUp);
router.patch('/auth/confirm', [checkToken, checkVerificationCode], newAuth.verifyPhoneNumber);
router.post('/auth/signin', [checkSignIn], newAuth.signIn);
export default router;
