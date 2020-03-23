import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const CheckSignUp = (req, res, next) => {
  const signUpSchema = Joi.object().keys({
    firstName: Joi.string()
      .trim()
      .max(50)
      .required(),
    lastName: Joi.string()
      .trim()
      .max(50)
      .required(),
    otherName: Joi.string()
      .trim()
      .max(50)
      .allow(''),
    phoneNumber: Joi.string().regex(/^[+]2507[238]\d{7}?/).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    isBuyer: Joi.string().valid('yes', 'no'),
  });
  const schemasValidation = Joi.validate(req.body, signUpSchema);
  validationHelper(res, schemasValidation, next);
};
export default CheckSignUp;
