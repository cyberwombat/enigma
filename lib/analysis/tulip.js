/**
 * Tulip
 *
 * https://github.com/TulipCharts/tulipnode
 * https://tulipindicators.org
 */

const doApply = async ({ fn, input, options }) => {
  const tulind = require('tulind')
  const method = tulind.indicators[fn]
  return new Promise((resolve, reject) => {
    method.indicator([input], options, (err, results) => {
      if (err) return reject(err)
      resolve(results)
    })
  })
}
exports.doApply = doApply
