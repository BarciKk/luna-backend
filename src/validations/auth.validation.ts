import { z } from "zod";

const validate = {
  email: z.string().email({ message: "Email must be in valid format" }).min(3).max(64),
  username: z.string().min(4, { message: "Username must be at least 4 characters long" }).max(32),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8),
  token: z.string(),
};
export const registerValidation = z.object({
  email: validate.email,
  username: validate.username,
  password: validate.password,
  repeatPassword: validate.confirmPassword,
});

export const loginValidation = z.object({
  username: validate.username,
  password: validate.password,
});

export const forgotPasswordValidation = z.object({
  email: validate.email,
});

export const resetPasswordValidation = z.object({
  token: validate.token,
  password: validate.password,
});
