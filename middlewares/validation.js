// middleware/validation.js
const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateNewsItem = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      //   "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    description: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.empty": 'The "name" field must be filled in',
    }),

    urlToImage: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    publishedAt: Joi.date().iso(),

    source: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    url: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "source url" field must be filled in',
      "string.uri": 'the "source url" field must be a valid url',
    }),
    keyword: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});

module.exports.validateUserRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),

    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24),
  }),
});

// module.exports.validateUserUpdate = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30).messages({
//       "string.min": 'The minimum length of the "name" field is 2',
//       "string.max": 'The maximum length of the "name" field is 30',
//       "string.empty": 'The "name" field must be filled in',
//     }),
//     avatar: Joi.string().required().custom(validateURL).messages({
//       "string.empty": 'The "imageUrl" field must be filled in',
//       "string.uri": 'the "imageUrl" field must be a valid url',
//     }),
//   }),
// });
