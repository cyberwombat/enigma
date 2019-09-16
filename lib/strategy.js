const path = require('path')
const { doValidate, joi } = require('./validation')

const loadStrategy = (name) => {
  return require(path.resolve('lib/strategies', name))
}

const runStrategy = async (date, type, options) => {
  // options = doValidate(options, schema)

  // params = doValidate(params, joi.object().keys({
  //   startTimestamp: joi.date().iso().default(getCurrentTimestamp())
  // }))

  // const { doSell, doBuy } = loadTrader(options.trader.type)
  const { doRun } = loadStrategy(type)

  const trigger = await doRun(date, options)

  // if (trigger > 0) {
  //   await doBuy(options.trader.options)
  // }

  // if (trigger < 0) {
  //   await doSell(options.trader.options)
  // }

  return { result: trigger } // console.log('Not doing nothing!')
}

exports.runStrategy = runStrategy
exports.loadStrategy = loadStrategy
