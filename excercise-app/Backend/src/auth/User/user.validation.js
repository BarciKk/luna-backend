import Joi from "Joi";

const registrationSchema = Joi.object({
  username: Joi.string().min(3).max(15).required().alphanum(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
    .required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(15).required().alphanum(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const registerValidation = (registerData) =>
  registrationSchema.validate(registerData, { abortEarly: false });

const loginValidation = (loginData) =>
  loginSchema.validate(loginData, { abortEarly: false });

export { registerValidation, loginValidation };
