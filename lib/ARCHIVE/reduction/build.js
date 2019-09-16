const {sortTransactionByTimestamps, roundTransactionTimestamps } = require('./utils')
const { getCollectionName, getLastDate, filterDataByDate, insertData } = require('./storage')

const doReduce = async (cp, transactions, period, interval) => {
  const collection = getCollectionName({ period, interval, cp })

  const timestamp = await getLastDate(collection)

  const compiled = compileTransactions(transactions, period, interval)
  const filtered = filterDataByDate(compiled, timestamp)

  const { result, insertedCount } = await insertData(collection, filtered)
  return { success: result.ok, count: insertedCount }
}

const compileTransactions = (transactions, period, interval) => {
  let ohlc = {}
  const sorted = sortTransactionByTimestamps(transactions)
  const entries = roundTransactionTimestamps(sorted, period, interval)
  entries.forEach(e => {
    if (!ohlc[e.timestamp]) {
      ohlc[e.timestamp] = {
        timestamp: e.timestamp,
        open: +e.price,
        high: null,
        low: null,
        close: null,
        volume: 0
      }
    }
    ohlc[e.timestamp].high = ohlc[e.timestamp].high ? Math.max(ohlc[e.timestamp].high, e.price) : +e.price
    ohlc[e.timestamp].low = ohlc[e.timestamp].low ? Math.min(ohlc[e.timestamp].low, e.price) : +e.price
    ohlc[e.timestamp].close = +e.price
    ohlc[e.timestamp].volume += +e.amount
  })
  return Object.values(ohlc)
}


exports.sortTransactionByTimestamps = sortTransactionByTimestamps
exports.compileTransactions = compileTransactions
exports.doReduce = doReduce
exports.roundTransactionTimestamps = roundTransactionTimestamps
