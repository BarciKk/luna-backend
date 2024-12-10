import { z } from "zod";
import { translateValidateMessage } from "Utils/validateMessage";

const nameSchema = z
  .string()
  .min(3, { message: translateValidateMessage("minTaskNameLength") })
  .max(64, { message: translateValidateMessage("maxTaskNameLength") });

const dateSchema = z.string().refine(
  (val) => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    return isoDateRegex.test(val);
  },
  { message: translateValidateMessage("invalidDateFormat") }
);

const prioritySchema = z
  .number()
  .int()
  .min(1, { message: translateValidateMessage("minPriority") })
  .max(5, { message: translateValidateMessage("maxPriority") });

const descriptionSchema = z
  .string()
  .max(255, { message: translateValidateMessage("maxDescriptionLength") })
  .optional();

const userIdSchema = z
  .number()
  .positive({ message: "User ID must be a positive number" });

const createTaskSchema = z.object({
  name: nameSchema,
  date: dateSchema,
  priority: prioritySchema,
  description: descriptionSchema,
  userId: userIdSchema,
});

export {
  nameSchema,
  dateSchema,
  prioritySchema,
  descriptionSchema,
  userIdSchema,
  createTaskSchema,
};
