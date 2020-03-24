import moment from 'moment';
import { querry } from '../Db';

class Order {
  async createOrder(req, res) {
    const {
      productName, description, quantity, location,
    } = req.body;
    const { id: buyerId } = req.tokenData;
    const createdOn = moment().format('LLL');
    const state = 'pending';
    const insertQuery = `INSERT INTO orders (buyerId, productName, description, quantity, location, createdOn, updatedOn, state)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
    const result = await querry(insertQuery, [buyerId, productName, description, quantity, location, createdOn, createdOn, state]);
    res.status(201).json({
      status: 201,
      message: 'Order created successfully',
      data: result[0],
    });
  }
}
export default Order;
