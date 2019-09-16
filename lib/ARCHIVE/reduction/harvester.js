const moment = require('moment')
const joi = require('joi')
const { doValidate } = require('../validation')
const { getCollectionName, getLastDate, filterDataByDate, insertData } = require('./storage')

const fetchData = async (options, params) => {
  options = doValidate(options, {
    transport: joi.string().required().valid(['alphavantage']),
    currency: joi.string().required(),
    market: joi.string().required(),
    interval: joi.string().required().valid(['monthly', 'weekly', 'daily', 'intraday']),
    start: joi.date(),
    end: joi.date()
  })

  const { doFetch } = require('./transports/' + options.transport)

  return doFetch(options, params)
}

const storeData = async (data, options) => {
  const table = getCollectionName(options)

  const timestamp = await getLastDate(table)

  const { result, insertedCount } = await insertData(table, filterDataByDate(data, timestamp))
  return { count: insertedCount, success: !!result.ok }
}

const fetchAndStoreDate = async (options, params) => {
  return storeData(fetchData(options, params))
}

exports.fetchAndStoreDate = fetchAndStoreDate
exports.storeData = storeData
exports.fetchData = fetchData
