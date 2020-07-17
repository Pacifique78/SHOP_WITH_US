import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkPaginationParams = (req, res, next) => {
  const paginationParamsSchemas = {
    pageNbr: Joi.number().positive().required(),
    model: Joi.string().valid('orders', 'users'),
  };
  const schemasValidation = Joi.validate(req.params, paginationParamsSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkPaginationParams;
