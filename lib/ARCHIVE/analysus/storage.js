const { getCollection } = require('../db')
const { doValidate, joi } = require('../validation')

const getCollectionName = () => {
  return 'statistics'
}


const storeFunctionResult = async (results) => {
  const c = await getCollection(getCollectionName())
  const ops = results.map(r => {
    return { replaceOne: { filter: { timestamp: r.timestamp }, replacement: r, upsert: true } }
  })

  const res = await c.bulkWrite(ops)
  return { success: !!res.ok, count: res.upsertedCount + res.modifiedCount }
}

const getAnalysisData = async (criteria) => {
  const c = await getCollection(getCollectionName())
  return c.find(criteria).toArray()
}


exports.getAnalysisData = getAnalysisData
exports.getCollectionName = getCollectionName
exports.storeFunctionResult = storeFunctionResult

