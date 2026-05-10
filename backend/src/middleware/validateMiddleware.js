const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const tripSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('', null).max(500),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref('startDate')).required(),
  coverPhoto: Joi.string().uri().allow('', null),
  visibility: Joi.string().valid('private', 'public').default('private'),
});

const stopSchema = Joi.object({
  cityId: Joi.string().uuid().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref('startDate')).required(),
  stopOrder: Joi.number().integer().min(0).required(),
  notes: Joi.string().allow('', null).max(1000),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    res.status(400);
    throw new Error(errorMessage);
  }
  next();
};

module.exports = {
  validate,
  signupSchema,
  loginSchema,
  tripSchema,
  stopSchema,
};
