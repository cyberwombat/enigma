const { test, fresh, nock } = require('../../bootstrap')

test.only('doFetchHistoricalTransactions() fetches BTCEUR historical data', async t => {
  const { doFetchHistoricalTransactions } = require('../../../lib/historical/cp/btceur')
  const { getCollection } = require('../../../lib/db')

  // Nock recorder doesnt work on gz - we make our own
  const compressedMock = require('zlib').gzipSync("'1512474229','9803.920000000000','0.137166000000'\n'1512474241','9842.660000000000','0.135389040000'")

  nock('http://api.bitcoincharts.com:80', {'encodedQueryParams': true})
  .get('/v1/csv/bitsoMXN.csv.gz')
  .reply(200, compressedMock)

  const { success, count } = await doFetchHistoricalTransactions()
  const c = await getCollection('transactions.btcusd')
  const total = await c.find().count()
  t.truthy(success)
  t.is(count, 2)
  t.is(total, 2)
})
