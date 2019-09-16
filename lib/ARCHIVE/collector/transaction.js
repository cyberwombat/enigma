const config = require('config')
const joi = require('joi')
const { doValidate } = require('../validation')
const { asDate } = require('../date')
const { getCollection, hasCollection } = require('../db')

const getCollectionName = ({ cp, exchange }) => {
  // doValidate(source, joi.
  if (!source) throw new Error('Invalid source provided')
  return `transactions.${source}`
}

const filterDataByDate = (data, timestamp) => {
  return data.filter(d => d.timestamp > timestamp)
}

const insertData = async (table, data) => {
  const c = await getCollection(table)

  const timestamp = await getLastDate(table)

  return c.insert(filterDataByDate(data, timestamp))
}

const getData = async (currency, interval, criteria) => {
  const c = await getCollection(getCollectionName({ currency, interval }))
  return c.find(criteria).toArray()
}

const getLastDate = async (table) => {
  const c = await getCollection(table)
  const items = await c.find({}, { timestamp: 1 }).sort({timestamp: -1}).limit(1).toArray()

  return items.length ? items[0].timestamp : '1970-01-01T00:00:00.000Z'
}

const fetchLatestTransactions = async (cp, exchange) => {
  options = doValidate(options, {
    source: joi.string().required().valid(config.currencies)
  })
  const { doFetchLatestTransactions } = require('./exchanges/' + exchange)
  return doFetchLatestTransactions()
}

const fetchHistoricalTransactions = async (options) => {
  options = doValidate(options, {
    source: joi.string().required().valid(config.currencies)
  })
  const { doFetchHistoricalTransactions } = require('./sources/' + options.source)

  return doFetchHistoricalTransactions(options.source)
}

const storeData = async (options, data) => {
  doValidate(options, {
    source: joi.string().required().valid(config.currencies)
  })
  doValidate(data, joi.array())

  const collection = getCollectionName(options)

  const timestamp = await getLastDate(collection)

  const filtered = filterDataByDate(data, timestamp)

  const { result, insertedCount } = await insertData(collection, filtered)
  return { count: insertedCount, success: !!result.ok }
}

const fetchAndStoreDate = async (options, params) => {
 // return storeData(fetchData(options, params))
}

const getCandles = async (exchange, cp, start, end, period, interval = 1) => {
  const c = await getCollection(`transactions.${exchange}.${cp}`)

  let offset
  switch (period) {
    case 'd':
    case 'day':
    case 'days':
      offset = 1000 * 86400 * interval
      break
    case 'h':
    case 'hour':
    case 'hous':
      offset = 1000 * 3600 * interval
      break
    case 'm':
    case 'minute':
    case 'minutes':
      offset = 1000 * 60 * interval
      break
  }

  const mapper = `function () { emit(Math.floor(this.timestamp.getTime() / ${offset}) * ${offset}, { open: +this.price, high: +this.price, low: +this.price, close: +this.price, volume: +this.amount } )}`

  const reducer = function (key, values) {
    let reduced = { open: values[0].open, high: values[0].high, low: values[0].low, close: values[values.length - 1].close, volume: 0 }

    for (var i = 0; i < values.length; i++) {
      reduced.volume += values[i].volume
      reduced.high = Math.max(reduced.high, values[i].high)
      reduced.low = Math.min(reduced.low, values[i].low)
    }

    return reduced
  }

  const finalize = function (key, values) {
    values.timestamp = new Date(key)
    return values
  }

  await c.mapReduce(
    mapper,
    reducer,
    {
      query: {timestamp: { $gte: new Date(start), $lte: new Date(end) }},
      sort: { timestamp: 1 },
      out: { merge: 'candles' },
      finalize: finalize
    })
  const mr = await getCollection('candles')

  const res = await mr.find().toArray()

  return res.map(i => i.value)
}

const hasData = async (cp, exchange, start, end) => {
  const name = `transactions.${exchange}.${cp}`
  if (!await hasCollection(name)) return false

  const c = await getCollection(name)

  // We check for data before and after
  const older = await c.findOne({ timestamp: { $lt: asDate(start) } })
  const newer = await c.findOne({ timestamp: { $gt: asDate(end) } })
  return !!older && !!newer
}

exports.hasData = hasData
exports.getCandles = getCandles
exports.getData = getData
exports.filterDataByDate = filterDataByDate
exports.getCollectionName = getCollectionName
exports.getLastDate = getLastDate
exports.insertData = insertData
exports.fetchHistoricalTransactions = fetchHistoricalTransactions
exports.fetchAndStoreDate = fetchAndStoreDate
exports.storeData = storeData
exports.fetchLatestTransactions = fetchLatestTransactions
