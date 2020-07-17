import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkForgotPassword = (req, res, next) => {
  const forgotPasswordSchemas = Joi.object().keys({
    email: Joi.string()
      .trim()
      .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
      .error(() => ({
        message: 'email is not valid',
      })),
  });
  const schemasValidation = Joi.validate(req.body, forgotPasswordSchemas);
  validationHelper(res, schemasValidation, next);
};
export default checkForgotPassword;
