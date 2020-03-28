import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkOrderParams = (req, res, next) => {
  const orderParamsSchemas = {
    orderId: Joi.number().positive().required(),
  };
  const schemasValidation = Joi.validate(req.params, orderParamsSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkOrderParams;
