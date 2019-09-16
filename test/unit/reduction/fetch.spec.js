const { test, nock } = require('../../bootstrap')

test('fetchLatestTrades() fetchs BTCUSD trades from Bitstamp', async t => {
  const { fetchLatestTransactions } = require('../../lib/harvest/fetch')

  const mocks = [ { date: '1513092458',
    tid: '31771606',
    price: '16933.38',
    type: '1',
    amount: '0.07573473' },
  { date: '1513092457',
    tid: '31771599',
    price: '16977.30',
    type: '1',
    amount: '0.07629062' }]
  nock('https://www.bitstamp.net', {'encodedQueryParams': true})
  .get('/api/v2/transactions/btcusd')
  .query({'time': 'hour'})
  .reply(200, mocks)

  const { data } = await fetchLatestTransactions('btcusd')
  t.deepEqual(data, mocks)
})
