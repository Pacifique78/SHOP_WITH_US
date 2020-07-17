import { querry } from '../Db';

const checkOwnerWithDescription = async (req, res, next) => {
  const selectQuery = 'SELECT * FROM price_descriptions WHERE id=$1 AND buyerid=$2;';
  const result = await querry(selectQuery, [
    parseInt(req.params.orderId, 10),
    req.tokenData.id,
  ]);
  if (result[0] || req.tokenData.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'You are not allowed to perform this action',
    });
  }
};
export default checkOwnerWithDescription;
