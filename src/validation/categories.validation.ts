import { translateValidateMessage } from "Utils/validateMessage";
import { z } from "zod";

const validate = {
  name: z
    .string()
    .min(3, translateValidateMessage("minCategoryNameLength"))
    .max(64, translateValidateMessage("maxCategoryNameLength")),

  icon: z
    .string()
    .min(3, translateValidateMessage("minCategoryIconLength"))
    .max(24, translateValidateMessage("maxCategoryIconLength")),

  color: z
    .string()
    .min(1)
    .refine((val) => val !== "", {
      message: "Color cannot be transparent!",
    }),

  userId: z.number(),
};
const userIdSchema = z.object({
  userId: validate.userId,
});
const createCategorySchema = z.object({
  name: validate.name,
  icon: validate.icon,
  color: validate.color,
  userId: validate.userId,
});

const updateCategorySchema = z.object({
  id: z.string().min(1, translateValidateMessage("categoryIdRequired")),
  name: validate.name,
  icon: validate.icon,
  color: validate.color,
  userId: validate.userId,
});

const categoryIdSchema = z.object({
  categoryId: z.string().min(1, translateValidateMessage("categoryIdRequired")),
});

export {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
  userIdSchema,
};
