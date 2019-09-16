const { test, nock } = require('../../bootstrap')

test('doFetchLatestTransactions() fetchs BTCUSD trades from Bitstamp', async t => {
  const { doFetchLatestTransactions } = require('../../../lib/transaction/sources/btcusd')

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

  const { data } = await doFetchLatestTransactions('btcusd')
  t.deepEqual(data, [ { timestamp: '2017-12-12T15:27:38.000Z',
    price: '16933.38',
    amount: '0.07573473' },
  { timestamp: '2017-12-12T15:27:37.000Z',
    price: '16977.30',
    amount: '0.07629062' }])
})

