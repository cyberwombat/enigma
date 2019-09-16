const ccxt = require('ccxt')
const { isoTimestampToUnixMillisecondTimestamp } = require('../date')
const { createFile } = require('../file')
const path = require('path')
const { getCollection } = require('./db')

const fetchTradeHistory = async (exchange, cp, since) => {
  let ex = new ccxt[exchange]()

  const trades = await ex.fetchTrades(cp, isoTimestampToUnixMillisecondTimestamp(since))

  return trades.map(t => {
    return {
      timestamp: new Date(t.datetime),
      'price': parseFloat(t.price),
      'amount': parseFloat(t.amount)
    }
  })
}

const storeAsFixtures = async (data, file) => {
  return createFile(JSON.stringify(data), path.resolve('./data/fixtures', file))
}

const loadFixtures = async (collection, file) => {
  const trades = require(path.resolve('data/fixtures', file))
  const c = await getCollection(collection)

  for (let t in trades) {
    await c.insertOne({ timestamp: new Date(t.timestamp), price: t.price, amount: t.amount })
  }
  return { success: true }
}

exports.loadFixtures = loadFixtures
exports.storeAsFixtures = storeAsFixtures
exports.fetchTradeHistory = fetchTradeHistory
