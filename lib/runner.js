const { doValidate, joi } = require('./validation')
const { runStrategy } = require('./strategy')
const { loadTrader, getHoldings, getHistory } = require('./trader')
const { getTimestampRange } = require('./timestamp')
const schema = joi.object().keys({
  trader: joi.any(),
  strategy: joi.any()
})

let options = {}
const doSetup = async (params) => {
  options = doValidate(params, schema)

   loadTrader(params.trader.type, params.trader.options)
}

const runOnce = async (date) => {
  options = doValidate(options, schema)

  await runStrategy(date, options.strategy.type, options.strategy.options)
}

const runUntil = async (start, end, period, interval) => {
  let stamps = getTimestampRange(start, end, period, interval)

  for (let stamp of stamps) {
    await runOnce(stamp)
  }
}

const runAndRepeat = async (start, end, period, interval, modulator) => {
  const { hasRepeater, modulateOptions } = modulator

  while (hasRepeater()) {
    options = modulateOptions(options)
    await runUntil(start, end, period, interval)
  }
}

const getResults = async () => {
  const trades = await getHistory()
  return {
    trades: trades.reduce((r, t) => {
      if (t.type === 'buy') r.buy++
      if (t.type === 'sell') r.sell++
      return r
    }, { buy: 0, sell: 0 }),
    balance: await getHoldings()
  }
}
const getSummary = async () => {
  console.log('This doesnt do anything yet - maybe a total revenue summary?')
}
exports.getSummary = getSummary
exports.getResults = getResults
exports.runAndRepeat = runAndRepeat
exports.runUntil = runUntil
exports.runOnce = runOnce
exports.doSetup = doSetup
