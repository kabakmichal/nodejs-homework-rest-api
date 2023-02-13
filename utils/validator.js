const joi = require("joi");

const contactSchema = joi.object({

  name: joi.string().min(3),
  email: joi.string().email(),
  phone: joi.string().min(5),
  favorite: joi.boolean(),
});

const validator = (schema) => (body) =>
  schema.validate(body, { abortEarly: false });

const contactValidate = validator(contactSchema);

module.exports = { contactValidate };
