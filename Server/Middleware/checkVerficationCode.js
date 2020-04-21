import Joi from 'joi';
import validationHelper from '../Helpers/ValidationHelper';

const checkVerificationCode = (req, res, next) => {
  const verificationCodeSchema = Joi.object().keys({
    verifyCode: Joi.string().min(6).max(6),
  });
  const schemasValidation = Joi.validate(req.body, verificationCodeSchema);
  validationHelper(res, schemasValidation, next);
};
export default checkVerificationCode;
