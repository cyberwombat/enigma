const axios = require('axios')
const moment = require('moment')
const zlib = require('zlib')
const byline = require('byline')
const config = require('config')
const { getCollectionName } = require('../storage')
const { getCollection } = require('../../db')
const ps = require('promise-streams')
const parse = require('csv-parse')

const transportFetchLatestTransactions = async (source) => {
  return axios({
    method: 'get',
    url: config.sources.transactional[source],
    params: { time: 'hour' },
    transformResponse: data => {
      const entries = JSON.parse(data)
      return entries.map(e => {
        return {
          price: e.price,
          amount: e.amount,
          timestamp: moment.unix(e.date).toDate()
        }
      })
    }})
}

const transportFetchHistoricalTransactions = async (source) => {
  const c = await getCollection(getCollectionName({ source }))

  await c.remove()

  const storeRow = async line => {
    const [ timestamp, price, amount ] = line.toString().split(',')

    if (timestamp) {
      const payload = {
        timestamp: moment.unix(timestamp).toDate(),
        price,
        amount
      }
      return c.insertOne(payload)
    }
  }

  const response = await axios({
    method: 'get',
    url: config.sources.historical[source],
    responseType: 'stream'
  })

  const gunzip = zlib.createGunzip()
  const res = await response.data
  .pipe(gunzip)
  .pipe(parse({trim: true}))
  .pipe(ps.map({concurrent: 4}, row => storeRow(row)))
  .wait()

  return { success: true }
}

exports.transportFetchHistoricalTransactions = transportFetchHistoricalTransactions
exports.transportFetchLatestTransactions = transportFetchLatestTransactions
