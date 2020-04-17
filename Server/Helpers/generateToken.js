import jwt from 'jsonwebtoken';

const generateToken = (id, email, phoneNumber, isAdmin, isBuyer, status, numberOfOrders) => jwt.sign({
  id, email, phoneNumber, isAdmin, isBuyer, status, numberOfOrders,
}, process.env.secret, {
  expiresIn: '1d',
});
export default generateToken;
