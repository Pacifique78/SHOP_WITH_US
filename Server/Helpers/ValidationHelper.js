const validationHelper = (res, schemasValidation, next) => {
  if (schemasValidation.error) {
    const validationErrors = [];
    for (let i = 0; i < schemasValidation.error.details.length; i += 1) {
      validationErrors.push(schemasValidation.error.details[i].message.split('"').join(' '));
    }
    return res.status(400).json({
      status: 400,
      error: validationErrors[0],
    });
  }
  next();
};
export default validationHelper;
