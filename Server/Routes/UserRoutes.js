import express from 'express';
import Users from '../Controller/UsersController';
import checkToken from '../Middleware/checkToken';
import checkUserParams from '../Middleware/checkUserParams';
import checkAdmin from '../Middleware/checkAdmin';

const router = express.Router();
const newUser = new Users();
router.get('/users', [checkToken, checkAdmin], newUser.getAllUsers);
router.get('/user/:start', [checkToken, checkAdmin], newUser.selectUserByName);
router.get('/users/:userId', [checkToken, checkAdmin, checkUserParams], newUser.getSpecificUser);
router.patch('/users/:userId', [checkToken, checkAdmin, checkUserParams], newUser.desactivateUser);
router.patch('/change-user/:userId', [checkToken, checkAdmin, checkUserParams], newUser.changeUser);
export default router;
