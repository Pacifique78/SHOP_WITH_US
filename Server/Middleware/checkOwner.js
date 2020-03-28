import { querry } from '../Db';

const checkOwner = async (req, res, next) => {
  const selectQuery = 'SELECT * FROM orders WHERE id=$1 AND buyerid=$2;';
  const result = await querry(selectQuery, [parseInt(req.params.orderId, 10), req.tokenData.id]);
  if (result[0] || req.tokenData.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'You are not allowed to perform this action',
    });
  }
};
export default checkOwner;
