const { isValidInterval, isValidCurrency } = require('./currency')
const getCollectionName = ({ prefix, interval, currency }) => {
  if (!isValidCurrency(currency) || !isValidInterval(interval)) throw new Error(`Invalid parameters passed to getCollectionName(p:${prefix}, c:${currency}, i:${interval}`)
  return `${prefix}.${interval}.${currency}`.toLowerCase()
}

exports.getCollectionNamePrefixed = getCollectionName
