import jwt from 'jsonwebtoken';

const generateToken = (id, phoneNumber, isAdmin, isBuyer, status, numberOfOrders) => jwt.sign({
  id, phoneNumber, isAdmin, isBuyer, status, numberOfOrders,
}, process.env.secret, {
  expiresIn: '1d',
});
export default generateToken;
