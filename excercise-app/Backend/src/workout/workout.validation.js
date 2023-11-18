import Joi from "Joi";

const workoutSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.date(),
  exercise: Joi.array().items({
    title: Joi.string().required(),
    sets: Joi.number().required(),
    reps: Joi.number().required(),
    load: Joi.number().required(),
  }),
});

const workoutValidation = (workoutData) => workoutSchema.validate(workoutData);

export { workoutValidation };
