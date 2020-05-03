import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkUserParams = (req, res, next) => {
  const userParamsSchemas = {
    userId: Joi.number().positive().required(),
  };
  const schemasValidation = Joi.validate(req.params, userParamsSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkUserParams;
