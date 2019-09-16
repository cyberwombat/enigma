const currencies = require('../data/currencies.json')
const getCurrencies = () => {
  return currencies
}

const getCurrencyName = (code) => {
  return currencies[code]
}

const isValidCurrency = (code) => {
  return !!currencies[code.toUpperCase()]
}

const isValidInterval = (i) => {
  return !!~['monthly', 'weekly', 'daily', 'intraday'].indexOf(i.toLowerCase())
}

const toLower = (cp) => {
  return cp.replace('/', '').toLowerCase()
}

const splitCurrencies = (cp) => {
  const [ base, quote ] = cp.split('/')
  return { base, quote }
}

exports.toLower = toLower
exports.splitCurrencies = splitCurrencies
exports.isValidInterval = isValidInterval
exports.getCurrencies = getCurrencies
exports.isValidCurrency = isValidCurrency
exports.getCurrencyName = getCurrencyName
