const { roundToNearestInterval } = require('./timestamp')

const destructureSource = (source) => {
  const match = String(source).match(/(\d+)(\w+)\.(\w+)/)
  if (!match) throw new Error(`Invalid collection name ${source}`)
  const [whole, interval, period, cp] = match // eslint-disable-line no-unused-vars
  return { interval, period, cp }
}

const sortTransactionByTimestamps = (transactions) => {
  return transactions.sort((a, b) => a.timestamp > b.timestamp)
}

const roundTransactionTimestamps = (transactions, period, interval) => {
  return transactions.map(e => {
    e.timestamp = roundToNearestInterval(e.timestamp, period, interval)
    return e
  })
}

exports.destructureSource = destructureSource
exports.sortTransactionByTimestamps = sortTransactionByTimestamps
exports.roundTransactionTimestamps = roundTransactionTimestamps
