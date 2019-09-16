/**
 * Talib
 *
 * https://github.com/oransel/node-talib
 * http://ta-lib.org
 */
// const talib = require('talib')

const doApply = async ({ fn, candles, options }) => {
  const talib = require('talib') // Here to assist test else we get a module did not self register when testing fetchPreset
  let params = { name: fn.toUpperCase(), ...options, ...candles }
  return new Promise((resolve, reject) => {
    talib.execute(params, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

exports.doApply = doApply
