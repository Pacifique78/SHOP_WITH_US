import jwt from 'jsonwebtoken';

const generateToken = (id, name, email, phoneNumber, isAdmin, isBuyer, status, numberOfOrders, code = 0) => jwt.sign({
  id, name, email, phoneNumber, isAdmin, isBuyer, status, numberOfOrders, code,
}, process.env.secret, {
  expiresIn: '1d',
});
export default generateToken;
