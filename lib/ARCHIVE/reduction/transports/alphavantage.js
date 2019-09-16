const axios = require('axios')
const joi = require('joi')
const moment = require('moment')
const { doValidate } = require('../../validation')
const { marketModel } = require('../storage')

const doFetch = async (options, params) => {
  params = doValidate(params, {
    apikey: joi.string().required(),
    url: joi.string().uri().default('https://www.alphavantage.co/query')
  })

  const data = await doRequest(getRequestParams(options, params))

  return formatData(data, options)
}

const getRequestParams = (options, params) => {
  let interval
  switch (options.interval) {
    case 'monthly':
      interval = 'DIGITAL_CURRENCY_MONTHLY'
      break
    case 'weekly':
      interval = 'DIGITAL_CURRENCY_WEEKLY'
      break
    case 'daily':
      interval = 'DIGITAL_CURRENCY_DAILY'
      break
    case 'intraday':
      interval = 'DIGITAL_CURRENCY_INTRADAY'
      break
  }

  return {
    method: 'get',
    url: params.url,
    params: {
      function: interval,
      symbol: options.currency,
      market: options.market,
      apikey: params.apikey
    }
  }
}

const doRequest = async params => {
  const { data } = await axios(params)
  return data
}

const formatData = (data, options) => {
  switch (options.interval) {
    case 'monthly':
      return formatDataMonthly(data, options)
    case 'weekly':
      return formatDataWeekly(data, options)
    case 'daily':
      return formatDataDaily(data, options)
    case 'intraday':
      return formatDataIntraday(data, options)
  }
}

const formatDataIntraday = (data, options) => {
  let entries = []
  const items = data['Time Series (Digital Currency Intraday)']
  for (let ts in items) {
    let price = items[ts]['1a. price (USD)']
    let volume = items[ts]['2. volume']
    let cap = items[ts]['3. market cap (USD)']
    let timestamp = moment(ts).toDate()
    entries.push({
      source: options.transport,
      interval: options.interval,
      currency: options.currency,
      market: options.market,
      timestamp: timestamp,
      high: price,
      low: price,
      close: price,
      open: price,
      volume: volume,
      cap: cap
    })
  }
  return entries
}

const formatDataDaily = (data, options) => {

}

const formatDataWeekly = (data, options) => {

}

const formatDataMonthly = (data, options) => {

}

exports.doFetch = doFetch
