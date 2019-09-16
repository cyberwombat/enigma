const { test, fresh, nock } = require('../../bootstrap')

test('getCollectionName() returns table name', async t => {
  const { getCollectionName } = fresh('../../lib/harvest/storage')

  const table = getCollectionName({
    currency: 'BTC',
    interval: 'monthly'
  })

  t.is(table, 'market.monthly.btc')
})

test('getLatestTimestamp() returns last entry by timestamp', async t => {
  const { getLastDate } = fresh('../../lib/harvest/storage')

  const timestamp = await getLastDate('market.foo.bar')

  t.is(timestamp, '2017-10-09T22:05:00.000Z')
})

test('filterDataByDate() returns table name', async t => {
  const { filterDataByDate } = fresh('../../lib/harvest/storage')

  const data = filterDataByDate([{
    timestamp: '2017-12-09T22:05:00.000Z'
  }, {
    timestamp: '2017-11-09T22:05:00.000Z'
  }, {
    timestamp: '2017-10-09T22:05:00.000Z'
  }], '2017-10-20T22:05:00.000Z')

  t.is(data.length, 2)
})


test('fetchLatestTransactions() fetchs BTCUSD trades from Bitstamp', async t => {
  const { fetchLatestTransactions } = require('../../lib/collector/transaction')

  nock('https://www.bitstamp.net', {'encodedQueryParams': true})
  .get('/api/v2/transactions/btcusd')
  .query({'time': 'hour'})
  .reply(200, [ { date: '1513092458',
    tid: '31771606',
    price: '16933.38',
    type: '1',
    amount: '0.07573473' },
  { date: '1513092457',
    tid: '31771599',
    price: '16977.30',
    type: '1',
    amount: '0.07629062' }])

  const { data } = await fetchLatestTransactions({ source: 'btcusd' })
  t.deepEqual(data, [ { timestamp: '2017-12-12T15:27:38.000Z',
    price: '16933.38',
    amount: '0.07573473' },
  { timestamp: '2017-12-12T15:27:37.000Z',
    price: '16977.30',
    amount: '0.07629062' }])
})

test('storeData()', async t => {
  const { storeData } = require('../../lib/collector/transaction')

  const res = await storeData({ source: 'btcusd' }, [{
    timestamp: '2017-10-12T15:27:38.000Z',
    price: '16933.38',
    amount: '0.07573473'
  }, {
    timestamp: '2017-12-12T15:27:37.000Z',
    price: '16977.30',
    amount: '0.07629062'
  }])
  t.deepEqual(res, { count: 1, success: true })
})

