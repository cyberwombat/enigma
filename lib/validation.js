const joi = require('joi')

const doValidate = (params, schema, options) => {
  const validation = joi.validate(params, schema, Object.assign({ allowUnknown: true, abortEarly: false, convert: true }, options))

  if (validation.error) {
    throw new Error(validation.error)
  }

  return validation.value
}

exports.joi = joi
exports.doValidate = doValidate
