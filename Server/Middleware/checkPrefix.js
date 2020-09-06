import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkPrefixParams = (req, res, next) => {
  const prefixParamsSchemas = {
    start: Joi.string().length(1).required(),
    model: Joi.string().valid('orders', 'users'),
  };
  const schemasValidation = Joi.validate(req.params, prefixParamsSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkPrefixParams;
