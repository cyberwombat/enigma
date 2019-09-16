const { doValidate, joi } = require('../validation')
const { loadStrategy } = require('../strategy')
const { loadTrader } = require('../trader')
const { listCollections, removeCollection } = require('../db')

const schema = joi.object().keys({
  trader: joi.any(),
  strategy: joi.any()
})

const initCollections = async () => {
  const collections = await listCollections()

  const transactions = collections.filter(c => c.match(/transactions\..+/))

  for (let c of transactions) {
    await removeCollection(c)
  }
  // TODO I suppose we could improve on this :)
  return true
}

const doInit = async () => {
  const { doInit } = loadTrader('log')

  doInit()
}

const runSequence = async (date, options) => {
  options = doValidate(options, schema)

  // params = doValidate(params, joi.object().keys({
  //   startTimestamp: joi.date().iso().default(getCurrentTimestamp())
  // }))

  // const { doSell, doBuy } = loadTrader(options.trader.type)
  const { runStrategy } = loadStrategy(options.strategy.type)

  const trigger = await runStrategy(date, options.strategy.options)

  // if (trigger > 0) {
  //   await doBuy(options.trader.options)
  // }

  // if (trigger < 0) {
  //   await doSell(options.trader.options)
  // }

  return { result: trigger } // console.log('Not doing nothing!')
}

exports.doInit = doInit
exports.initCollections = initCollections
exports.runSequence = runSequence
