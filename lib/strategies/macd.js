// Runs MACD indicator
const { doValidate, joi } = require('../validation')
const { applyIndicator } = require('../indicator')
const { doBuy, doSell, doHold } = require('../signal')

const schema = joi.object().keys({

  resultSize: joi.number().min(2)

})

const doRun = async (date, options) => {
  options = doValidate(options, schema)
  options.inputTimestamp = date

  const { macdOutput, macdSignal, macdHistogram } = await applyIndicator('MACD', options)

  const { currencyPair } = options
  
  // We analyze the MACD histogram for a change in direction
  const last = macdHistogram[macdHistogram.length - 1]
  const previous = macdHistogram[macdHistogram.length - 2]

  // The last check is to make sure we dont have 0-0
  if (previous <= 0 && last >= 0 && last > previous) { return doBuy(currencyPair) }

  if (previous >= 0 && last <= 0 && last < previous) { return doSell(currencyPair) }

  return doHold(currencyPair)
}

exports.doRun = doRun
