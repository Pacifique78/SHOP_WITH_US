import express from 'express';
import Order from '../Controller/OrderController';
import checkToken from '../Middleware/checkToken';
import checkOrder from '../Middleware/checkOrder';
import checkOrderParams from '../Middleware/checkParams';
import checkAdmin from '../Middleware/checkAdmin';
import checkDeliverer from '../Middleware/checkDeleverer';
import checkPerformOrder from '../Middleware/checkPerformOrder';
import checkOwner from '../Middleware/checkOwner';
import checkOwnerWithDescription from '../Middleware/checkOwnerWithDescription';
import checkPaginationParams from '../Middleware/checkPaginationParams';

const router = express.Router();
const newOrder = new Order();
router.post('/orders', [checkToken, checkOrder], newOrder.createOrder);
router.get('/orders', [checkToken, checkDeliverer], newOrder.getAllOrders);
router.get(
  '/price_descriptions',
  [checkToken],
  newOrder.getAllPrice_description
);
router.get(
  '/orders/:orderId',
  [checkToken, checkOrderParams],
  newOrder.getSpecificOrder
);
router.get('/myorders', [checkToken], newOrder.viewMyOrders);
router.delete(
  '/myorders/:orderId',
  [checkToken, checkOrderParams, checkOwner],
  newOrder.deleteMyOrder
);
router.patch(
  '/myorders/:orderId',
  [checkToken, checkOrder, checkOwner, checkOrderParams],
  newOrder.updateMyOrder
);
router.delete(
  '/orders/:orderId',
  [checkToken, checkAdmin, checkOrderParams],
  newOrder.deleteOrder
);
router.post(
  '/price_descriptions',
  [checkToken, checkDeliverer, checkPerformOrder],
  newOrder.performOrder
);
router.patch(
  '/orders/:orderId',
  [checkToken, checkOwnerWithDescription, checkOrderParams],
  newOrder.acceptPrice
);
router.patch(
  '/rejected/:orderId',
  [checkToken, checkAdmin, checkOrderParams],
  newOrder.updateAcceptedOrder
);
router.get('/index/:pageNbr', newOrder.IndexPaginate);
router.get(
  '/mydescriptions/pages/:pageNbr',
  [checkToken],
  newOrder.getPriceDescriptionForMyOrder
);
export default router;
