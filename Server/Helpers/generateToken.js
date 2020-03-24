import jwt from 'jsonwebtoken';

const generateToken = (id, email, isAdmin, isBuyer, status, numberOfOrders) => jwt.sign({
  id, email, isAdmin, isBuyer, status, numberOfOrders,
}, process.env.secret, {
  expiresIn: '1d',
});
export default generateToken;
