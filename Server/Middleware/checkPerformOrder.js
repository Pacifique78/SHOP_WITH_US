import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkPerformOrder = (req, res, next) => {
  const performOrderSchema = Joi.object().keys({
    orderId: Joi.number().positive().required(),
    price: Joi.number().positive().required(),
  });
  const schemasValidation = Joi.validate(req.body, performOrderSchema);
  validationHelper(res, schemasValidation, next);
};
export default checkPerformOrder;
