import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkSignIn = (req, res, next) => {
  const signInSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });
  const schemasValidation = Joi.validate(req.body, signInSchema);
  validationHelper(res, schemasValidation, next);
};
export default checkSignIn;
