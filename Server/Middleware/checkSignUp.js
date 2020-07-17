import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const CheckSignUp = (req, res, next) => {
  const signUpSchema = Joi.object().keys({
    name: Joi.string().trim().max(255).required(),
    email: Joi.string()
      .trim()
      .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
      .error(() => ({
        message: 'email is not valid',
      })),
    phoneNumber: Joi.string()
      .regex(/^[+]2507[238]\d{7}?/)
      .required()
      .error(() => ({
        message: 'phone number format +2507xxxxxxxx',
      })),
    password: Joi.string()
      .trim()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .error(() => ({
        message: 'password: 1Capital, 1Small, 1Number, 1Character',
      })),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .error(() => ({
        message: "Passwords don't match",
      })),
    isBuyer: Joi.string().valid('yes', 'no'),
  });
  const schemasValidation = Joi.validate(req.body, signUpSchema);
  validationHelper(res, schemasValidation, next);
};
export default CheckSignUp;
