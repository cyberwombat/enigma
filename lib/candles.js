const { getCollection } = require('./db')
const { asDate, asMoment } = require('./date')
const { getInverseTimestampRangeCount, getTimestampOffsetFromSize } = require('./timestamp')
const { getCollectionName, validateAndUpdate } = require('./transaction')

const fillEmptyCandles = (candles, count, period, interval) => {
  
  const timestamps = getInverseTimestampRangeCount(candles[0].timestamp, count, period, interval)

  let candelabra = []

  for (var i = 0; i < timestamps.length; i++) {
    let timestamp = timestamps[i]

    let c = candles.find(e => {
      e.timestamp = asMoment(e.timestamp).toISOString()
      return (e.timestamp === timestamp)
    })


    if (!c) {
      const { open, high, close, low } = candelabra[candelabra.length - 1]
      c = { timestamp, open, high, low, close, volume: 0 }
    }

    candelabra.push(c)
  }
  return candelabra
}

const createCandles = (transactions, period, interval) => {
  const offset = getOffset(period, interval)

  return Object.values(transactions
    .reduce((a, t) => {
      const timestamp = asMoment(Math.floor(t.timestamp.getTime() / offset) * offset).toISOString()
      if (!a[timestamp]) a[timestamp] = { timestamp, open: 0, high: 0, low: 0, close: 0, volume: 0 }
      a[timestamp].open += +t.price
      a[timestamp].high += +t.price
      a[timestamp].low += +t.price
      a[timestamp].close += +t.price
      a[timestamp].volume += +t.amount

      return a
    }, {}))
}

const getOffset = (period, interval) => {
  let offset
  switch (period) {
    case 'd':
    case 'day':
    case 'days':
      offset = 1000 * 86400 * interval
      break
    case 'h':
    case 'hour':
    case 'hours':
      offset = 1000 * 3600 * interval
      break
    case 'm':
    case 'minute':
    case 'minutes':
      offset = 1000 * 60 * interval
      break
    default:
      throw new Error(`Invalid period ${period}`)
  }
  return offset
}

const fetchCandles = async (type, ex, cp, date, count, period, interval = 1) => {
  const name = getCollectionName(type, ex, cp)
  const c = await getCollection(name)

  const start = asDate(getTimestampOffsetFromSize(date, count, period, interval))
  await validateAndUpdate(type, ex, cp, start, date)

  // Get first date that is <= to start and adjust start to that
  const begin = await c.findOne({ timestamp: { $lte: start } }, { 'sort': [['timestamp', 'desc']] })
  if (!begin) throw new Error(`No data found on or before ${start} in collection ${name}`)

  const s = begin.timestamp
  const e = asDate(date)

  const offset = getOffset(period, interval)

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
    values.timestamp = new Date(key).toISOString()
    return values
  }

  const res = await c.mapReduce(
    mapper,
    reducer,
    {
      query: {timestamp: { $gte: s, $lte: e }},
      sort: { timestamp: 1 },
      out: { inline: 1 }, // merge: 'candles' },
      finalize: finalize
    })

  // const mr = await getCollection('candles')
  // const res = await mr.find().toArray()
  const candles = res.map(i => i.value)

  // Because begin may not be our start we need to adjust to prevent making potential extra filled candles
  candles[0].timestamp = new Date(Math.floor(start.getTime() / offset) * offset).toISOString()

  return fillEmptyCandles(candles, count, period, interval)
}

const meltCandles = candles => {
  if (!Array.isArray(candles)) throw new Error('Invalid market data')

  const entries = candles.reduce((acc, cur, idx, arr) => {
    Object.keys(acc).forEach(k => {
      acc[k].push(cur[k])
    })
    return acc
  }, { open: [], close: [], high: [], low: [], volume: [] })
  return entries
}

const fetchMeltedCandles = async (type, ex, cp, date, count, period, interval = 1) => {
  return meltCandles(await fetchCandles(type, ex, cp, date, count, period, interval))
}

exports.fillEmptyCandles = fillEmptyCandles
exports.createCandles = createCandles
exports.fetchMeltedCandles = fetchMeltedCandles
exports.meltCandles = meltCandles
exports.fetchCandles = fetchCandles
