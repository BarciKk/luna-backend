import { translateValidateMessage } from "Utils/validateMessage";
import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: translateValidateMessage("emailValidFormat") })
  .min(3, { message: "Email must be at least 3 characters long" })
  .max(64, { message: "Email must not exceed 64 characters" });

const usernameSchema = z
  .string()
  .min(4, { message: translateValidateMessage("minUsernameLength") })
  .max(32, { message: "Username must not exceed 32 characters" });

const passwordSchema = z
  .string()
  .min(8, { message: translateValidateMessage("minPasswordLength") });

const repeatPasswordSchema = passwordSchema.refine(
  (value) => value !== undefined && value.length >= 8,
  {
    message: translateValidateMessage("confirmPassword"),
  }
);

const termsSchema = z.literal(true, {
  errorMap: () => ({ message: "You must accept Terms and Conditions" }),
});

const registerSchema = z
  .object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    repeatPassword: repeatPasswordSchema,
    terms: termsSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const resetPasswordEmailSchema = z.object({
  email: emailSchema,
});

const updatePasswordSchema = z.object({
  password: passwordSchema,
});

export {
  registerSchema,
  loginSchema,
  resetPasswordEmailSchema,
  updatePasswordSchema,
};
