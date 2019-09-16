const path = require('path')
const applyIndicator = async (name, options) => {
  const { applyFunction } = require(path.resolve('lib/indicators', name))
  return applyFunction(options)
}
exports.applyIndicator = applyIndicator
