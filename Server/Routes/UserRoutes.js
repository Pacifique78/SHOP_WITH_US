import express from 'express';
import Users from '../Controller/UsersController';
import checkToken from '../Middleware/checkToken';
import checkUserParams from '../Middleware/checkUserParams';
import checkAdmin from '../Middleware/checkAdmin';
import checkPaginationParams from '../Middleware/checkPaginationParams';
import checkSearchParams from '../Middleware/CheckSearchParams';
import checkDeliverer from '../Middleware/checkDeleverer';
import checkPrefixParams from '../Middleware/checkPrefix';

const router = express.Router();
const newUser = new Users();
router.get('/users', [checkToken, checkAdmin], newUser.getAllUsers);
router.get(
  '/:model/page/:pageNbr',
  [checkToken, checkAdmin, checkPaginationParams],
  newUser.paginate
);
router.get(
  '/:model/prefix/:start',
  [checkToken, checkAdmin, checkPrefixParams],
  newUser.selectByName
);
router.get(
  '/users/:userId',
  [checkToken, checkAdmin, checkUserParams],
  newUser.getSpecificUser
);
router.patch(
  '/users/:userId',
  [checkToken, checkAdmin, checkUserParams],
  newUser.desactivateUser
);
router.patch(
  '/change-user/:userId',
  [checkToken, checkAdmin, checkUserParams],
  newUser.changeUser
);
router.get(
  '/search/:model/:searchKey?',
  [checkToken, checkDeliverer, checkSearchParams],
  newUser.search
);
export default router;
