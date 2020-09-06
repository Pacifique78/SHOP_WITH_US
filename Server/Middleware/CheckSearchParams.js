import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkSearchParams = (req, res, next) => {
  const searchParamsSchemas = {
    searchKey: Joi.string().allow(''),
    model: Joi.string().valid('orders', 'users'),
  };
  const schemasValidation = Joi.validate(req.params, searchParamsSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkSearchParams;
