const { test, fresh, nock } = require('../../bootstrap')
const { asMoment }

test.only('fetchTradeHistory()', async t => {
  const { fetchTradeHistory } = fresh('../../../lib/transactions/fetcher')

  const trades = await fetchTradeHistory('binance', 'ETH/USDT', '2018-01-12T00:00:00.000Z')
  console.log(trades.length)

  t.pass()
})
