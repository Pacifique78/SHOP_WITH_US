import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkResetPassword = (req, res, next) => {
  const resetPasswordSchemas = Joi.object().keys({
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
  });
  const schemasValidation = Joi.validate(req.body, resetPasswordSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkResetPassword;
