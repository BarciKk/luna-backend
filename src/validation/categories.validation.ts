import { translateValidateMessage } from "Utils/validateMessage";
import { z } from "zod";

const nameSchema = z
  .string()
  .min(3, { message: translateValidateMessage("minCategoryNameLength") })
  .max(64, { message: translateValidateMessage("maxCategoryNameLength") });

const iconSchema = z
  .string()
  .min(3, { message: translateValidateMessage("minCategoryIconLength") })
  .max(24, { message: translateValidateMessage("maxCategoryIconLength") });

const colorSchema = z
  .string()
  .min(1, { message: "Color cannot be empty!" })
  .refine((val) => val !== "", {
    message: "Color cannot be transparent!",
  });

const userIdSchema = z
  .number()
  .positive({ message: "User ID must be a positive number" });

const idSchema = z
  .string()
  .min(1, { message: translateValidateMessage("categoryIdRequired") });

const categoryIdSchema = z.object({
  categoryId: idSchema,
});

const createCategorySchema = z.object({
  name: nameSchema,
  icon: iconSchema,
  color: colorSchema,
  userId: userIdSchema,
});

const updateCategorySchema = z.object({
  id: idSchema,
  name: nameSchema,
  icon: iconSchema,
  color: colorSchema,
  userId: userIdSchema,
});

export {
  nameSchema,
  iconSchema,
  colorSchema,
  userIdSchema,
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
};
