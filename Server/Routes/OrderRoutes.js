import express from 'express';
import Order from '../Controller/OrderController';
import { checkToken } from '../Middleware/checkToken';
import checkOrder from '../Middleware/checkOrder';

const router = express.Router();
const newOrder = new Order();
router.post('/orders', [checkToken, checkOrder], newOrder.createOrder);
export default router;
