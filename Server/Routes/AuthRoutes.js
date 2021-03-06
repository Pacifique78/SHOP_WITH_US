import express from 'express';
import User from '../Controller/AuthController';
import CheckSignUp from '../Middleware/checkSignUp';
import checkToken from '../Middleware/checkToken';
import checkVerificationCode from '../Middleware/checkVerficationCode';
import checkSignIn from '../Middleware/checkSignIn';
import checkForgotPassword from '../Middleware/checkForgetPassword';
import renderHtml from '../Helpers/renderHtml';
import checkResetPassword from '../Middleware/checkResetPassword';

const router = express.Router();
const newAuth = new User();
router.post('/auth/signup', [CheckSignUp], newAuth.signUp);
router.patch(
  '/auth/confirm',
  [checkToken, checkVerificationCode],
  newAuth.verifyPhoneNumber
);
router.get('/auth/resend', [checkToken], newAuth.resendVerificationCode);
router.post('/auth/signin', [checkSignIn], newAuth.signIn);
router.post(
  '/auth/forgot-password',
  [checkForgotPassword],
  newAuth.forgetPassword
);
router.get('/auth/forgot-password/:token', [checkToken], renderHtml);
router.post(
  '/auth/reset-password',
  [checkToken, checkResetPassword],
  newAuth.resetPassword
);
export default router;
