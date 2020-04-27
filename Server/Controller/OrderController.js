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

  async getAllOrders(req, res) {
    const selectQuerry = 'SELECT * FROM orders ORDER BY updatedon DESC;';
    const results = await querry(selectQuerry);
    if (results[0]) {
      return res.status(200).json({
        status: 200,
        message: 'Orders successfully retreived',
        data: {
          results,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No pending order found',
    });
  }

  async getSpecificOrder(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    const selectQuerry = 'SELECT * FROM orders WHERE id=$1;';
    const result = await querry(selectQuerry, [orderId]);
    if (result[0]) {
      return res.status(200).json({
        status: 200,
        message: 'Order successfully retrieved',
        data: result[0],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Order not found',
    });
  }

  async viewMyOrders(req, res) {
    const selectQuerry = 'SELECT * FROM orders WHERE buyerid=$1 ORDER BY updatedon DESC;';
    const results = await querry(selectQuerry, [req.tokenData.id]);
    if (results[0]) {
      return res.status(200).json({
        status: 200,
        name: req.tokenData.name,
        message: 'Order(s) successfully retreived',
        data: {
          results,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      name: req.tokenData.name,
      error: 'There is no orders yet please create some orders',
    });
  }

  async updateMyOrder(req, res) {
    const selectQuerry = 'SELECT * FROM orders WHERE id=$1 AND buyerid=$2;';
    const result = await querry(selectQuerry, [parseInt(req.params.orderId, 10), req.tokenData.id]);
    if (result[0]) {
      const {
        productName, description, quantity, location,
      } = req.body;
      const updatedOn = moment().format('LLL');
      const updateQuery = 'UPDATE orders SET productname=$1, description=$2, quantity=$3, location=$4, updatedon=$5 WHERE id=$6 RETURNING *';
      const updatedOrder = await querry(updateQuery, [productName, description, quantity, location, updatedOn, parseInt(req.params.orderId, 10)]);
      return res.status(200).json({
        status: 200,
        message: 'Order successfully updated',
        data: {
          updatedOrder,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Order not found',
    });
  }

  async deleteMyOrder(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    const buyerId = req.tokenData.id;
    const selectQuerry = 'SELECT * FROM orders WHERE id=$1 AND buyerid=$2;';
    const result = await querry(selectQuerry, [orderId, buyerId]);
    if (result[0]) {
      const deleteQuerry = 'DELETE FROM orders WHERE id=$1;';
      await querry(deleteQuerry, [orderId]);
      return res.status(204).json();
    }
    return res.status(404).json({
      status: 404,
      error: 'Order not found',
    });
  }

  async deleteOrder(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    const selectQuerry = 'SELECT * FROM orders WHERE id=$1;';
    const result = await querry(selectQuerry, [orderId]);
    if (result[0]) {
      const deleteQuerry = 'DELETE FROM orders WHERE id=$1;';
      await querry(deleteQuerry, [orderId]);
      return res.status(204).json();
    }
    return res.status(404).json({
      status: 404,
      error: 'Order not found',
    });
  }

  async performOrder(req, res) {
    const { orderId, price } = req.body;
    const selectQuery = 'SELECT * FROM orders WHERE id=$1;';
    const orderFound = await querry(selectQuery, [orderId]);
    if (!orderFound[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Order not found',
      });
    }
    const {
      buyerid, productname, description, quantity,
    } = orderFound[0];
    const delivererId = req.tokenData.id;
    const insertQuery = 'INSERT INTO price_descriptions (orderId, buyerId, delivererId, productName, description, quantity, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
    const result = await querry(insertQuery, [orderId, buyerid, delivererId, productname, description, quantity, price]);
    return res.status(200).json({
      status: 200,
      message: 'Price provided successfully',
      data: {
        result,
      },
    });
  }

  async acceptPrice(req, res) {
    const selectQuerry = 'SELECT * FROM price_descriptions WHERE id=$1;';
    const priceDescriptionFound = await querry(selectQuerry, [parseInt(req.params.orderId, 10)]);
    if (!priceDescriptionFound[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Price description not found',
      });
    }
    const selectQuerry2 = 'SELECT * FROM orders WHERE id=$1;';
    const orderFound = await querry(selectQuerry2, [priceDescriptionFound[0].orderid]);
    if (!orderFound) {
      return res.status(404).json({
        status: 404,
        error: 'order not found',
      });
    }
    const updatedOn = moment().format('LLL');
    const updateQuery = 'UPDATE orders SET state=$1, updatedon=$2 WHERE id=$3 RETURNING *;';
    const updatedOrder = await querry(updateQuery, ['accepted', updatedOn, orderFound[0].id]);
    return res.status(200).json({
      status: 200,
      message: 'Order accepted',
      data: updatedOrder,
    });
  }

  async updateAcceptedOrder(req, res) {
    const selectQuerry = 'SELECT * FROM orders WHERE id=$1;';
    const orderFound = await querry(selectQuerry, [req.params.orderId]);
    if (!orderFound) {
      return res.status(404).json({
        status: 404,
        error: 'Order not found',
      });
    }
    const updatedOn = moment().format('LLL');
    const updateQuery = 'UPDATE orders SET state=$1, updatedon=$2 WHERE id=$3 RETURNING *;';
    const updatedOrder = await querry(updateQuery, ['pending', updatedOn, req.params.orderId]);
    return res.status(200).json({
      status: 200,
      message: 'Order updated',
      data: updatedOrder,
    });
  }
}
export default Order;
