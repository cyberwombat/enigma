const { test, fresh, nock } = require('../../bootstrap')

test('hasData() finds transaction data in desired range', async t => {
  const { hasData } = require('../../lib/historical')

  const res = await hasData('btceur', '2017-12-05T06:12:07.000Z', '2017-12-08T18:14:52.000Z')

  t.truthy(res)
})

test('hasData() cannot find transaction data in desired range', async t => {
  const { hasData } = require('../../lib/historical')

  const res = await hasData('btceur', '2017-12-05T06:12:07.000Z', '2018-12-08T18:14:52.000Z')

  t.falsy(res)
})

test('fetchHistoricalTransactions() fetches transaction data', async t => {
  const { fetchHistoricalTransactions } = require('../../lib/historical')

  const res = await fetchHistoricalTransactions('btceur', '2017-12-05T06:12:07.000Z', '2017-12-08T18:14:52.000Z')
  t.is(res.length, 4)
})

test('fetchHistoricalTransactions() throws when no valid data found', async t => {
  const { fetchHistoricalTransactions } = require('../../lib/historical')

  const error = await t.throws(fetchHistoricalTransactions('btceur', '2017-12-05T06:12:07.000Z', '2018-12-08T18:14:52.000Z'))
  console.log(error)
  // t.is(res.length, 4)
})

test.skip('updateHistoricalTransactions() fetches csv and loads transactions', async t => {
  const { updateHistoricalTransactions } = require('../../lib/historical')

  // Nock recorder doesnt work on gz - we make our own
  const compressedMock = require('zlib').gzipSync("'1512474229','9803.920000000000','0.137166000000'\n'1512474241','9842.660000000000','0.135389040000'")

  nock('http://api.bitcoincharts.com:80', {'encodedQueryParams': true})
  .get('/v1/csv/bitsoMXN.csv.gz')
  .reply(200, compressedMock)

  const { success, count } = await updateHistoricalTransactions({ source: 'btcusd' })
  t.truthy(success)
  t.is(count, 2)
})
