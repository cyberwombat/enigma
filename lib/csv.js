const axios = require('axios')
const moment = require('moment')
const zlib = require('zlib')
const ps = require('promise-streams')
const parse = require('csv-parse')
const stringify = require('csv-stringify')
const path = require('path')
const { createReadStream, createWriteStream } = require('fs')
const { getCollection } = require('./db')

const storeRow = async (c, line) => {
  const [ timestamp, price, amount ] = line.toString().split(',')

  if (timestamp) {
    const payload = {
      timestamp: moment.unix(timestamp).toDate(),
      price: parseFloat(price),
      amount: parseFloat(amount)
    }
    return c.insertOne(payload)
  }
}

const loadRemoteCSV = async (cp, source) => {
  const response = await axios({
    method: 'get',
    url: source,
    responseType: 'stream'
  })

  return loadCSVFromStream(cp, response.data)
}

const loadLocalCSV = async (collection, file) => {
  const stream = createReadStream(path.resolve('data', file))
  return loadCSVFromStream(collection, stream)
}

const loadCSVFromStream = async (collection, stream) => {
  const c = await getCollection(collection)
  const gunzip = zlib.createGunzip()

  await stream
    .pipe(gunzip)
    .pipe(parse({trim: true}))
    .pipe(ps.map({concurrent: 1}, row => process.env.NODE_ENV === 'test' ? async (c, row) => {} : storeRow(c, row)))
    .wait()

  return { success: true }
}

const createLocalCSV = async (data, file) => {
  const stream = stringify(data)
  stream.pipe(createWriteStream(file))
}
exports.createLocalCSV = createLocalCSV
exports.storeRow = storeRow
exports.loadRemoteCSV = loadRemoteCSV
exports.loadLocalCSV = loadLocalCSV
