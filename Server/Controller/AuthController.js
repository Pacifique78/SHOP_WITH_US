import hashPassword from '../Helpers/HashPossword';
import { querry } from '../Db';
import generateToken from '../Helpers/generateToken';
import checkPassword from '../Helpers/checkPassword';

const {
  accountSid, authToken, serviceSid,
} = process.env;
// eslint-disable-next-line global-require
const client = require('twilio')(accountSid, authToken);

class User {
  async signUp(req, res) {
    const {
      firstName, lastName, otherName, email, phoneNumber, password, isBuyer,
    } = req.body;
    const hashedPassword = hashPassword(password);
    const isAdmin = false;
    const status = 'inactive';
    const numberOfOrders = 0;
    try {
      const createQuery = 'INSERT INTO users (firstName, lastName, otherName, email, phoneNumber, password, isAdmin, isBuyer, status, numberOfOrders) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;';
      const result = await querry(createQuery, [firstName, lastName, otherName, email, phoneNumber, hashedPassword, isAdmin, isBuyer, status, numberOfOrders]);
      const { id } = result[0];
      client.verify.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' });
      const token = generateToken(id, email, isAdmin, isBuyer, numberOfOrders);
      res.status(201).json({
        status: 201,
        message: 'Account created...',
        data: {
          id,
          email,
          firstName,
          token,
        },
      });
    } catch (error) {
      res.status(409).json({
        status: 409,
        error: `User with ${email} already exists`,
      });
    }
  }

  async verifyPhoneNumber(req, res) {
    const { code } = req.body;
    const { id, phoneNumber } = req.tokenData;
    try {
      const verificationResult = await client.verify.services(serviceSid)
        .verificationChecks
        .create({ to: phoneNumber, code });
      if (verificationResult.status === 'approved') {
        const updateQuery = 'UPDATE users SET status=$1 where id=$2';
        const values = ['active', id];
        await querry(updateQuery, values);
        return res.status(200).json({
          status: 200,
          message: 'Phone Number verified',
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Phone must be verified first',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    const selectQuery = 'SELECT * FROM users where email=$1 ;';
    const value = [email];
    const rows = await querry(selectQuery, value);
    if (rows[0] && checkPassword(password, rows[0].password) && rows[0].status === 'active') {
      const {
        id, isAdmin, isBuyer, status, numberOfOrders,
      } = rows[0];
      const token = generateToken(id, email, isAdmin, isBuyer, status, numberOfOrders);
      return res.status(200).json({
        status: 200,
        message: 'Logged in successfully',
        data: {
          token,
        },
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Invalid username/ password OR phoneNumber not confirmed',
    });
  }
}
export default User;
