/**
 * MACD function from Tulip
 * https://tulipindicators.org/macd
 */

const { doValidate, joi } = require('../validation')
const { fetchMeltedCandles } = require('../candles')
const { doApply } = require('../analysis/tulip')

const schema = joi.object().keys({
  inputTimestamp: joi.date().iso(),
  inputIndicator: joi.string().required(),
  currencyPair: joi.string().required(),
  inputSource: joi.string().required(),
  inputType: joi.string().required(),
  candleType: joi.string().required(),
  candleInterval: joi.number().required(),
  resultSize: joi.number().default(1).min(1).integer(),
  optionLongPeriod: joi.number().required(),
  optionSignalPeriod: joi.number().required(),
  optionShortPeriod: joi.number().required()
})

const applyFunction = async (params) => {
  const { currencyPair, inputSource, inputType, resultSize, candleType, candleInterval, inputTimestamp, inputIndicator, optionShortPeriod, optionLongPeriod, optionSignalPeriod } = doValidate(params, schema)

  const candles = await fetchMeltedCandles(inputType, inputSource, currencyPair, inputTimestamp, (resultSize - 1) + optionLongPeriod, candleType, candleInterval)

  const analysis = await doApply({
    fn: 'macd',
    input: candles[inputIndicator],
    options: [ optionShortPeriod, optionLongPeriod, optionSignalPeriod ] })
  const [ macdOutput, macdSignal, macdHistogram ] = analysis

  return {
    macdOutput,
    macdSignal,
    macdHistogram
  }
}

exports.applyFunction = applyFunction
