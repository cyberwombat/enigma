const { getTransactions } = require('../../handlers/bicoincharts')
const { getHistoricalCandles } = require('../../candles')
const { unixTimestampToIsoTimestamp } = require('../../date')
const { loadLocalCSV } = require('../../../../csv')

const startDate = () => unixTimestampToIsoTimestamp('1388871179')
const endDate = () => unixTimestampToIsoTimestamp('1468926988')

const source = 'historical/krakenXRP.csv.gz'

const collection = 'historical.kraken.xrpbtc'

const fetchTransactions = async () => getTransactions(source)

const fetchCandles = async (date, count, period, interval = 1) => {
  return getHistoricalCandles
}

const loadHistory = async () => {
  return loadLocalCSV(collection, source)
}
exports.loadHistory = loadHistory

exports.startDate = startDate
exports.endDate = endDate
exports.fetchCandles = fetchCandles
exports.fetchTransactions = fetchTransactions
