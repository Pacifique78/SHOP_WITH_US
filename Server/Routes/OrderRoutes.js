import express from 'express';
import Order from '../Controller/OrderController';
import checkToken from '../Middleware/checkToken';
import checkOrder from '../Middleware/checkOrder';
import checkOrderParams from '../Middleware/checkParams';
import checkAdmin from '../Middleware/checkAdmin';
import checkDeliverer from '../Middleware/checkDeleverer';
import checkPerformOrder from '../Middleware/checkPerformOrder';
import checkOwner from '../Middleware/checkOwner';

const router = express.Router();
const newOrder = new Order();
router.post('/orders', [checkToken, checkOrder], newOrder.createOrder);
router.get('/orders', [checkToken, checkDeliverer], newOrder.getAllOrders);
router.get('/orders/:orderId', [checkToken, checkDeliverer, checkOrderParams], newOrder.getSpecificOrder);
router.get('/myorders', [checkToken], newOrder.viewMyOrders);
router.patch('/myorders/:orderId', [checkToken, checkOrder], newOrder.updateMyOrder);
router.delete('/orders/:orderId', [checkToken, checkAdmin, checkOrderParams], newOrder.deleteOrder);
router.post('/price_description', [checkToken, checkDeliverer, checkPerformOrder], newOrder.performOrder);
router.patch('/orders/:orderId', [checkToken, checkOrderParams], newOrder.acceptPrice);
router.patch('/rejected/:orderId', [checkToken, checkOwner, checkOrderParams], newOrder.updateAcceptedOrder);
export default router;
