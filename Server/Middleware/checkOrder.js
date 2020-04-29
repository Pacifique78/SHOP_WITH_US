import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkOrder = (req, res, next) => {
  const orderSchema = Joi.object().keys({
    productName: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.string().required(),
    location: Joi.string().required(),
    street: Joi.string().allow(''),
    locationDescription: Joi.string().required(),
  });
  const schemasValidation = Joi.validate(req.body, orderSchema);
  validationHelper(res, schemasValidation, next);
};
export default checkOrder;
