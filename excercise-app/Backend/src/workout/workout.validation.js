import Joi from "Joi";

const workoutSchema = Joi.object({
  name: Joi.string().min(5).max(48).required(),
  date: Joi.date(),
  exercise: Joi.array().items({
    title: Joi.string().min(5).max(32).required(),
    sets: Joi.number().min(1).max(30).required(),
    reps: Joi.number().min(1).max(50).required(),
    load: Joi.number().required().max(400),
  }),
});

const workoutValidation = (workoutData) => workoutSchema.validate(workoutData);

export { workoutValidation };
