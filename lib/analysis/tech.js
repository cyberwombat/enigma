/**
 * Technical Indicators
 *
 * https://github.com/anandanand84/technicalindicators
 */
const ti = require('technicalindicators')

const doApply = async ({ fn, candles, options }) => {
  const method = ti[fn]
  let params = { ...options, ...candles }
  return method.calculate(params)
}
exports.doApply = doApply
