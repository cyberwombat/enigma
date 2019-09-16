const { applyFunction, fetchPreset } = require('./analysis')
const { flattenData } = require('./storage')
const { getSample } = require('../candle/storage')
const { getTimestampRange } = require('../candle/utils')
const { doValidate, joi} = require('../validation')
const { storeFunctionResult } = require('./storage')
const config = require('config')

const doProcess = async (source, start, end) => {
  start = doValidate(start, joi.date().iso().required())
  end = doValidate(end, joi.date().iso().default(start))

  const { collection, fn, parameters } = fetchPreset(source)

  let data = []

  const timestamps = getTimestampRange(collection, start, end)

  for (let timestamp of timestamps) {
    data.push({
      timestamp,
      collection,
      fn,
      parameters,
      results: await processStamp(collection, timestamp, fn, parameters)
    })
  }

  return storeFunctionResult(data)
}

const processStamp = async (collection, stamp, fn, parameters) => {
  const size = parameters.endIdx || config.analysis.sample
  const offset = parameters.startIdx || 0

  let data = await getSample(collection, stamp, size, offset)
  const entries = flattenData(data)

  return applyFunction(fn, entries, parameters)
}

exports.doProcess = doProcess
