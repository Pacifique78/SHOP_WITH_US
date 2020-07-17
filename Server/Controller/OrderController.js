import moment from 'moment';
import { querry } from '../Db';

class Order {
  async createOrder(req, res) {
    const {
      productName,
      description,
      quantity,
      location,
      street,
      locationDesc,
    } = req.body;
    const { id: buyerId, name, phoneNumber } = req.tokenData;
    const createdOn = moment().format('LLL');
    const state = 'pending';
    const nbrOfBids = 0;
    const insertQuery = `INSERT INTO orders (buyerId, buyerName, buyerPhone, productName, description, quantity, location, street, locationDesc, createdOn, updatedOn, state, numberOfBids)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`;
    const result = await querry(insertQuery, [
      buyerId,
      name,
      phoneNumber,
      productName,
      description,
      quantity,
      location,
      street,
      locationDesc,
      createdOn,
      createdOn,
      state,
      nbrOfBids,
    ]);
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
        delivererId: req.tokenData.id,
        name: req.tokenData.name,
        message: 'Orders successfully retreived',
        data: results,
      });
    }
    return res.status(404).json({
      status: 404,
      name: req.tokenData.name,
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
    const selectQuerry =
      'SELECT * FROM orders WHERE buyerid=$1 ORDER BY updatedon DESC;';
    const results = await querry(selectQuerry, [req.tokenData.id]);
    if (results[0]) {
      return res.status(200).json({
        status: 200,
        name: req.tokenData.name,
        message: 'Order(s) successfully retreived',
        data: results,
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
    const result = await querry(selectQuerry, [
      parseInt(req.params.orderId, 10),
      req.tokenData.id,
    ]);
    if (result[0]) {
      const {
        productName,
        description,
        quantity,
        location,
        locationDesc,
        street,
      } = req.body;
      const updatedOn = moment().format('LLL');
      const updateQuery =
        'UPDATE orders SET productname=$1, description=$2, quantity=$3, location=$4, locationdesc=$5, street=$6, updatedon=$7 WHERE id=$8 RETURNING *';
      const updatedOrder = await querry(updateQuery, [
        productName,
        description,
        quantity,
        location,
        locationDesc,
        street,
        updatedOn,
        parseInt(req.params.orderId, 10),
      ]);
      return res.status(200).json({
        status: 200,
        message: 'Order successfully updated',
        data: updatedOrder[0],
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
      buyerid,
      productname,
      description,
      quantity,
      location,
      street,
      locationdesc,
      numberofbids,
    } = orderFound[0];
    const delivererId = req.tokenData.id;
    const selectQuerry2 =
      'SELECT * FROM price_descriptions WHERE orderid=$1 AND delivererid=$2;';
    const existingOrderDescription = await querry(selectQuerry2, [
      orderId,
      delivererId,
    ]);
    if (existingOrderDescription[0]) {
      const updateQuery = 'UPDATE price_descriptions SET price=$1 WHERE id=$2';
      const updatedResult = await querry(updateQuery, [
        price,
        existingOrderDescription[0].id,
      ]);
      return res.status(200).json({
        status: 200,
        message: 'Price provided successfully',
        data: updatedResult[0],
      });
    }
    const updateQuery2 = 'UPDATE orders SET numberofbids=$1 WHERE id=$2';
    await querry(updateQuery2, [+numberofbids + 1, orderId]);
    const insertQuery =
      'INSERT INTO price_descriptions (orderId, buyerId, delivererId, productName, description, quantity, location, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
    const result = await querry(insertQuery, [
      orderId,
      buyerid,
      delivererId,
      productname,
      description,
      quantity,
      `${location} ${street} ${locationdesc}`,
      price,
    ]);
    return res.status(200).json({
      status: 200,
      message: 'Price provided successfully',
      data: result[0],
    });
  }

  async acceptPrice(req, res) {
    const selectQuerry = 'SELECT * FROM price_descriptions WHERE id=$1;';
    const priceDescriptionFound = await querry(selectQuerry, [
      parseInt(req.params.orderId, 10),
    ]);
    if (!priceDescriptionFound[0]) {
      return res.status(404).json({
        status: 404,
        error:
          'No bid have been made yet, please wait for deliverers to make bids ',
      });
    }
    const selectQuerry2 = 'SELECT * FROM orders WHERE id=$1;';
    const orderFound = await querry(selectQuerry2, [
      priceDescriptionFound[0].orderid,
    ]);
    if (!orderFound) {
      return res.status(404).json({
        status: 404,
        error: 'order not found',
      });
    }
    const updatedOn = moment().format('LLL');
    const updateQuery =
      'UPDATE orders SET state=$1, updatedon=$2 WHERE id=$3 RETURNING *;';
    const updatedOrder = await querry(updateQuery, [
      'accepted',
      updatedOn,
      orderFound[0].id,
    ]);
    return res.status(200).json({
      status: 200,
      message: 'Order accepted',
      data: updatedOrder[0],
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
    const updateQuery =
      'UPDATE orders SET state=$1, updatedon=$2 WHERE id=$3 RETURNING *;';
    const updatedOrder = await querry(updateQuery, [
      'pending',
      updatedOn,
      req.params.orderId,
    ]);
    return res.status(200).json({
      status: 200,
      message: 'Order updated',
      data: updatedOrder[0],
    });
  }

  async getAllPrice_description(req, res) {
    const selectQuerry = 'SELECT * FROM price_descriptions;';
    const results = await querry(selectQuerry);
    if (results[0]) {
      return res.status(200).json({
        status: 200,
        name: req.tokenData.name,
        message: 'price_descriptions successfully retreived',
        data: results,
      });
    }
    return res.status(404).json({
      status: 404,
      name: req.tokenData.name,
      error: 'No price description found',
    });
  }
}
export default Order;
