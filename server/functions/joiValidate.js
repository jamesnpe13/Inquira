const joiValidate = (validationSchema, data, next) => {
  let { error, value } = validationSchema.validate(data, { abortEarly: false });
  error = { joi_validation: true, ...error };

  if (error) {
    next(error);
  }

  return { error: error, value: value };
};

module.exports = joiValidate;
