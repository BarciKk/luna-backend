import { translateValidateMessage } from "Utils/validateMessage";
import { z } from "zod";

const validate = {
  email: z
    .string()
    .email(translateValidateMessage("emailValidFormat"))
    .min(3)
    .max(64),
  username: z
    .string()
    .min(4, translateValidateMessage("minUsernameLength"))
    .max(32),
  password: z.string().min(8, translateValidateMessage("minPasswordLength")),
  confirmPassword: z
    .string()
    .min(8, translateValidateMessage("confirmPassword")),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept Terms and Conditions" }),
  }),
};

const registerSchema = z
  .object({
    email: validate.email,
    username: validate.username,
    password: validate.password,
    repeatPassword: validate.confirmPassword,
    terms: validate.terms,
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

const loginSchema = z.object({
  email: validate.email,
  password: validate.password,
});

const resetPasswordEmailSchema = z.object({
  email: validate.email,
});

const updatePasswordSchema = z.object({
  password: validate.password,
});

export {
  registerSchema,
  loginSchema,
  resetPasswordEmailSchema,
  updatePasswordSchema,
};
