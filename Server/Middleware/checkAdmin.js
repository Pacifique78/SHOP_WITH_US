const checkAdmin = (req, res, next) => {
  if (req.tokenData.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'only admins can perform this',
    });
  }
};
export default checkAdmin;
