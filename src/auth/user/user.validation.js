import Joi from "Joi";

const registrationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
    .required(),
  avatar: Joi.string(),
  isActive: Joi.boolean().default(true),
  createdAt: Joi.date(),
  bio: Joi.string().default(""),
  createdAt: Joi.date(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const registerValidation = (registerData) =>
  registrationSchema.validate(registerData, { abortEarly: false });

const loginValidation = (loginData) =>
  loginSchema.validate(loginData, { abortEarly: false });

export { registerValidation, loginValidation };
