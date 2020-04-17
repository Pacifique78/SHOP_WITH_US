const checkDeliverer = (req, res, next) => {
  if (req.tokenData.isBuyer) {
    return res.status(403).json({
      status: 403,
      error: 'only deliverers can perform this',
    });
  }
  next();
};
export default checkDeliverer;
