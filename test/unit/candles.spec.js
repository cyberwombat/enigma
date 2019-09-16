const { test, fresh, nock, fixtures } = require('../bootstrap')

test('fetchCandles() fetches candles', async t => {
  const { fetchCandles } = require('../../lib/candles')

  const res = await fetchCandles('hist', 'crytr', 'btceur', '2013-07-05T06:10:05.000Z', 5, 'hour', 1)

  t.deepEqual(res, [ { open: 45.00026,
    high: 45.00026,
    low: 45.00026,
    close: 45.00026,
    volume: 2,
    timestamp: '2013-07-05T02:00:00.000Z' },
  { open: 39.994,
    high: 39.994,
    low: 39.994,
    close: 39.994,
    volume: 4.98268716,
    timestamp: '2013-07-05T03:00:00.000Z' },
  { timestamp: '2013-07-05T04:00:00.000Z',
    open: 39.994,
    high: 39.994,
    low: 39.994,
    close: 39.994,
    volume: 0 },
  { timestamp: '2013-07-05T05:00:00.000Z',
    open: 39.994,
    high: 39.994,
    low: 39.994,
    close: 39.994,
    volume: 0 },
  { open: 38,
    high: 38,
    low: 38,
    close: 38,
    volume: 1,
    timestamp: '2013-07-05T06:00:00.000Z' } ])
})



test('fetchMeltedCandles() converts candle collection to arrays', async t => {
  const { fetchMeltedCandles } = fresh('../../lib/candles')

  const data = await fetchMeltedCandles('hist', 'crytr', 'btceur', '2013-07-05T06:10:05.000Z', 5, 'hour', 1)

  t.deepEqual(data, { open: [ 45.00026, 39.994, 39.994, 39.994, 38 ],
    close: [ 45.00026, 39.994, 39.994, 39.994, 38 ],
    high: [ 45.00026, 39.994, 39.994, 39.994, 38 ],
    low: [ 45.00026, 39.994, 39.994, 39.994, 38 ],
    volume: [ 2, 4.98268716, 0, 0, 1 ] })
})

test('createCandles() creates candles from provided transactions', t => {
  const { createCandles } = fresh('../../lib/candles')
  const candles = createCandles(fixtures['historical.btceur'], 'day', 1)
  t.deepEqual(candles, [
    { timestamp: '2017-12-05T00:00:00.000Z',
      open: 422,
      high: 422,
      low: 422,
      close: 422,
      volume: 9 },
    { timestamp: '2017-12-06T00:00:00.000Z',
      open: 234,
      high: 234,
      low: 234,
      close: 234,
      volume: 6 },
    { timestamp: '2017-12-07T00:00:00.000Z',
      open: 269,
      high: 269,
      low: 269,
      close: 269,
      volume: 6 },
    { timestamp: '2017-12-08T00:00:00.000Z',
      open: 496,
      high: 496,
      low: 496,
      close: 496,
      volume: 9 }
  ])
})

test('fillEmptyCandles()', t => {
  const { fillEmptyCandles } = fresh('../../lib/candles')
  const candles = [{
    timestamp: '2017-09-08T00:00:00.000Z',
    high: 6,
    low: 1,
    close: 2,
    open: 3,
    volume: 15
  }, {
    timestamp: '2017-09-10T00:00:00.000Z',
    high: 4,
    low: 2,
    close: 2,
    open: 3,
    volume: 11
  }]
  const filled = fillEmptyCandles(candles, 3, 'day', 1)
  t.is(typeof filled[0].timestamp, 'string')
  t.deepEqual(filled[1], { timestamp: '2017-09-09T00:00:00.000Z',
    open: 3,
    high: 6,
    low: 1,
    close: 2,
    volume: 0 })
})
