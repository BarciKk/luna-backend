import { z } from "zod";
import { translateValidateMessage } from "Utils/validateMessage";

const validate = {
  name: z
    .string()
    .min(3, translateValidateMessage("minTaskNameLength"))
    .max(64, translateValidateMessage("maxTaskNameLength")),
  date: z.string().refine((val) => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    return isoDateRegex.test(val);
  }, translateValidateMessage("invalidDateFormat")),
  priority: z
    .number()
    .int()
    .min(1, translateValidateMessage("minPriority"))
    .max(5, translateValidateMessage("maxPriority")),
  description: z
    .string()
    .max(255, translateValidateMessage("maxDescriptionLength"))
    .optional(),

  userId: z.number(),
};

const createTaskSchema = z.object({
  name: validate.name,
  date: validate.date,
  priority: validate.priority,
  description: validate.description,
  userId: validate.userId,
});

export { createTaskSchema };
