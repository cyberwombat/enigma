const { hasCollection, getCollection } = require('../db')
const { doValidate, joi } = require('../validation')
const { asDate } = require('../date')

const { destructureSource, roundToNearestInterval } = require('./utils')

// Schema
// source: null,
// interval: null,
// currency: null,
// market: null,
// timestamp: null,
// high: null,
// low: null,
// close: null,
// open: null,
// volume: null,
// cap: null

const getCollectionName = (params) => {
  params = doValidate(params, joi.object().keys({
    cp: joi.string().required(),
    interval: joi.number().default(1),
    period: joi.string().required().valid(['month', 'months', 'days', 'day', 'hours', 'hour', 'minutes', 'minute'])
  }))
  const { cp, period, interval } = params
  return `${interval}${period.replace('s', '')}.${cp}`
}

const filterDataByDate = (data, timestamp) => {
  return data.filter(d => d.timestamp > timestamp)
}

const insertData = async (table, data) => {
  const c = await getCollection(table)

  const timestamp = await getLastDate(table)

  return c.insert(filterDataByDate(data, timestamp))
}

const fetchCandles = async (source, timestamp, size = 100, offset = 0) => {
  const params = destructureSource(source)
  const { interval, period } = params
  const name = getCollectionName(params)
  timestamp = asDate(roundToNearestInterval(timestamp, period, interval))

  if (!await hasCollection(name)) { throw new Error(`Collection '${source}' does not exist~`) }
  const c = await getCollection(name)

  const exists = await c.findOne({ timestamp })
  if (!exists) throw new Error(`Timestamp ${timestamp} not found in '${source}' collection`)

  const index = await c.find({ timestamp: { $lte: timestamp } }).sort({ timestamp: 1 }).count()

  if (index < size) throw new Error('Not enough data for sampling!')
  return c.find({}).sort({ timestamp: 1 }).skip(index - size - offset).limit(size).toArray()
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

exports.fetchCandles = fetchCandles
exports.getData = getData
exports.filterDataByDate = filterDataByDate
exports.getCollectionName = getCollectionName
exports.getLastDate = getLastDate
exports.insertData = insertData
