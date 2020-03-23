import hashPassword from '../Helpers/HashPossword';
import { querry } from '../Db';
import generateToken from '../Helpers/generateToken';

class User {
  async signUp(req, res) {
    const {
      firstName, lastName, otherName, phoneNumber, password, isBuyer,
    } = req.body;
    const hashedPassword = hashPassword(password);
    const isAdmin = false;
    const status = 'inactive';
    const numberOfOrders = 0;
    try {
      const createQuery = 'INSERT INTO users (firstName, lastName, otherName, phoneNumber, password, isAdmin, isBuyer, status, numberOfOrders) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;';
      const result = await querry(createQuery, [firstName, lastName, otherName, phoneNumber, hashedPassword, isAdmin, isBuyer, status, numberOfOrders]);
      const { id } = result[0];
      const { accountSid, authToken, serviceSid } = process.env;
      // eslint-disable-next-line global-require
      const client = require('twilio')(accountSid, authToken);
      client.verify.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' });
      const token = generateToken(id, phoneNumber, isAdmin, isBuyer, numberOfOrders);
      res.status(201).json({
        status: 201,
        message: 'Account created...',
        data: {
          id,
          phoneNumber,
          firstName,
          token,
        },
      });
    } catch (error) {
      res.status(409).json({
        status: 409,
        error: `User with ${phoneNumber} already exists`,
      });
    }
  }
}
export default User;
