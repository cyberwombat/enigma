const { getCollection, hasCollection, listCollections, removeCollection } = require('./db')
const { asMoment, asDate } = require('./date')
const path = require('path')

const getCollectionName = (type, ex, cp) => {
  return `transactions.${type}.${ex}.${cp}`
}

const initCollections = async () => {
  const collections = await listCollections()

  const transactions = collections.filter(c => c.match(/transactions\..+/))

  for (let c of transactions) {
    await removeCollection(c)
  }
  // TODO I suppose we could improve on this :)
  return true
}

const isInitialized = async (type, ex, cp) => {
  const name = getCollectionName(type, ex, cp)
  return hasCollection(name)
}

const getSource = (type, ex, cp) => {
  return require(path.resolve('lib/transactions/sources', `${type}.${ex}.${cp}`))
}

const destructureSource = source => {
  const [type, ex, cp] = source.split('.')
  return { type, ex, cp }
}

const updateTransactions = async (type, ex, cp) => {
  const name = getCollectionName(type, ex, cp)
  const { doUpdate, doInit } = getSource(type, ex, cp)

  if (!await isInitialized(type, ex, cp)) {
    await doInit(name)
  }
  await doUpdate()
}

const getTicker = async (type, ex, cp, date) => {
  const name = getCollectionName(type, ex, cp)

  const c = await getCollection(name)
  const ts = date ? asDate(date) : new Date()
  const res = await c.findOne({ timestamp: { $lte: ts } }, { sort: [[ 'timestamp', 'desc']] })
  if (!res) throw new Error(`No ticker found for ${date} in ${type}${ex}${cp}`)
  return res
}

const findTransactions = async (type, ex, cp, start, end) => {
  const name = getCollectionName(type, ex, cp)

  await validateAndUpdate(type, ex, cp, start, end)
  const c = await getCollection(name)
  return c.find({ timestamp: { $gte: asDate(start), $lte: asDate(end) } }).toArray()
}

const validateDateRange = (type, ex, cp, start, end) => {
  const { startDate, endDate } = getSource(type, ex, cp)

  const s = asMoment(end)
  const e = asMoment(end)

  if (!s.isSameOrAfter(startDate()) || !e.isSameOrBefore(endDate())) throw new Error(`No data available for requested dates in ${getCollectionName(type, ex, cp)}`)
}

const validateAndUpdate = async (type, ex, cp, start, end) => {
  validateDateRange(type, ex, cp, start, end)
  await updateTransactions(type, ex, cp)
}

exports.destructureSource = destructureSource
exports.getTicker = getTicker
exports.initCollections = initCollections
exports.validateAndUpdate = validateAndUpdate
exports.validateDateRange = validateDateRange
exports.getCollectionName = getCollectionName
exports.isInitialized = isInitialized
exports.updateTransactions = updateTransactions
exports.findTransactions = findTransactions
