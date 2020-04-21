import hashPassword from '../Helpers/HashPossword';
import { querry } from '../Db';
import generateToken from '../Helpers/generateToken';
import checkPassword from '../Helpers/checkPassword';
import { sendTemplatedMail } from '../Helpers/sendEmail';
import generate from '../Helpers/generateVerificationCode';

class User {
  async signUp(req, res) {
    const {
      name, email, phoneNumber, password, isBuyer,
    } = req.body;
    const hashedPassword = hashPassword(password);
    const isAdmin = false;
    const status = 'inactive';
    const numberOfOrders = 0;
    const code = generate();
    try {
      const createQuery = 'INSERT INTO users (name, email, phoneNumber, password, isAdmin, isBuyer, status, numberOfOrders) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
      const result = await querry(createQuery, [name, email, phoneNumber, hashedPassword, isAdmin, isBuyer !== 'no', status, numberOfOrders]);
      const { id } = result[0];
      const token = generateToken(id, name, email, phoneNumber, isAdmin, isBuyer !== 'no', status, numberOfOrders, code);
      const data = [{
        ...result[0],
        code,
      }];
      const { password: pass, ...userData } = result[0];
      sendTemplatedMail('verify', data);
      res.status(201).json({
        status: 201,
        message: 'Account created...',
        data: {
          ...userData,
          token,
        },
      });
    } catch (error) {
      res.status(409).json({
        status: 409,
        error: `User with (${email}) email exists`,
      });
    }
  }

  async verifyPhoneNumber(req, res) {
    const { verifyCode } = req.body;
    const { id, code } = req.tokenData;
    if (verifyCode === code.toString()) {
      const updateQuery = 'UPDATE users SET status=$1 where id=$2 RETURNING *;';
      const result = await querry(updateQuery, ['active', id]);
      const { password, ...data } = result[0];
      return res.status(200).json({
        status: 200,
        data,
        message: 'Phone Number verified',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Wrong code, Please check again',
    });
  }

  async signIn(req, res) {
    const { email: mail, password: pass } = req.body;
    const selectQuery = 'SELECT * FROM users where email=$1 ;';
    const rows = await querry(selectQuery, [mail]);
    if (rows[0] && checkPassword(pass, rows[0].password) && rows[0].status === 'active') {
      const {
        id, name, phonenumber, isadmin, isbuyer, status, numberoforders,
      } = rows[0];
      const token = generateToken(id, name, mail, phonenumber, isadmin, isbuyer, status, numberoforders);
      const { password, ...data } = rows[0];
      return res.status(200).json({
        status: 200,
        message: 'Logged in successfully',
        data: {
          ...data,
          token,
        },
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Invalid email/ password OR phoneNumber not confirmed',
    });
  }

  async forgetPassword(req, res) {
    const { email } = req.body;
    const selectQuery = 'SELECT * FROM users where email=$1 ;';
    const rows = await querry(selectQuery, [email]);
    if (rows[0]) {
      const {
        id, phonenumber, isadmin, isbuyer, status, numberoforders,
      } = rows[0];
      const token = generateToken(id, email, phonenumber, isadmin, isbuyer, status, numberoforders);
      const data = [{
        ...rows[0],
        url: `${process.env.forgotPasswordUrl}/${token}`,
      }];
      sendTemplatedMail('forgotPassword', data);
      return res.status(200).json({
        status: 200,
        message: 'Email sent, Please check your inbox',
      });
    }
    return res.status(404).json({
      status: 404,
      error: `User with ${email} doesn't exist`,
    });
  }

  async resetPassword(req, res) {
    const { id } = req.tokenData;
    const { password } = req.body;
    const hashedPassword = hashPassword(password);
    const updateQuery = 'UPDATE users SET password=$1 where id=$2 RETURNING *;';
    const rows = await querry(updateQuery, [hashedPassword, id]);
    const data = [{
      ...rows[0],
    }];
    sendTemplatedMail('resetPassword', data);
    return res.status(200).json({
      status: 200,
      message: 'Password reset successfully',
    });
  }

  async resendVerificationCode(req, res) {
    const { id, code } = req.tokenData;
    const selectQuery = 'SELECT * FROM users WHERE id=$1;';
    const result = await querry(selectQuery, [id]);
    if (result[0]) {
      const data = [{
        ...result[0],
        code,
      }];
      sendTemplatedMail('verify', data);
      return res.status(200).json({
        status: 200,
        message: 'Verification Code successfully resent',
      });
    }
  }
}
export default User;
