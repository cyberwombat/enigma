const { test, nock, fresh } = require('../../bootstrap')

test('roundToNearestInterval() floors timestamp to nearest month', t => {
  const { roundToNearestInterval } = fresh('../../lib/reduction/build')

  const date = roundToNearestInterval('2017-12-12T15:27:37.000Z', 'month')
  t.is(date, '2017-12-01T00:00:00.000Z')
})

test('roundToNearestInterval() floors timestamp to nearest 5min', t => {
  const { roundToNearestInterval } = fresh('../../lib/reduction/build')

  const date = roundToNearestInterval('2017-12-12T15:27:37.000Z', 'minute', 5)
  t.is(date, '2017-12-12T15:25:00.000Z')
})

test('roundTransactionTimestamps() rounds timestamps to previous interval', t => {
  const { roundTransactionTimestamps } = fresh('../../lib/reduction/build')

  const data = [{
    timestamp: '2017-09-12T15:27:38.000Z',
    price: '16933.38',
    amount: '0.07573473'
  }]
  const res = roundTransactionTimestamps(data, 'minute', 15)

  t.deepEqual(res, [{
    timestamp: '2017-09-12T15:15:00.000Z',
    price: '16933.38',
    amount: '0.07573473'
  }])
})

test('doReduce()', async t => {
  const { doReduce } = fresh('../../lib/reduction/build')

  const data = [{
    timestamp: '2017-09-10T12:00:00.000Z',
    price: '100',
    amount: '1'
  }, {
    timestamp: '2017-09-11T10:00:00.000Z',
    price: '78',
    amount: '2'
  }, {
    timestamp: '2017-09-12T14:00:00.000Z',
    price: '12',
    amount: '3'
  }, {
    timestamp: '2017-09-13T06:00:00.000Z',
    price: '124',
    amount: '4'
  }]

  const { count } = await doReduce('btcusd', data, 'day')
  t.is(count, 3)
})

test('compileTransactions()', t => {
  const { compileTransactions } = fresh('../../lib/reduction/build')
  const data = [{
    timestamp: '2017-09-12T12:00:00.000Z',
    price: '100',
    amount: '1'
  }, {
    timestamp: '2017-09-12T10:00:00.000Z',
    price: '78',
    amount: '2'
  }, {
    timestamp: '2017-09-12T14:00:00.000Z',
    price: '12',
    amount: '3'
  }, {
    timestamp: '2017-09-13T06:00:00.000Z',
    price: '124',
    amount: '4'
  }]

  const result = compileTransactions(data, 'day')

  t.deepEqual(result, [
    { timestamp: '2017-09-12T00:00:00.000Z', open: 78, high: 100, low: 12, close: 12, volume: 6 },
    { timestamp: '2017-09-13T00:00:00.000Z', open: 124, high: 124, low: 124, close: 124, volume: 4 }
  ])
})

test.only('getTimestampRange() fetches timestamps range based on collection interval', t => {
  const { getTimestampRange } = fresh('../../lib/reduction/build')
  const range = getTimestampRange('1day.btceur', '2017-12-14T17:00:00.000', '2017-12-16T17:00:00.000')
  t.deepEqual(range, [ '2017-12-14T00:00:00.000Z', '2017-12-15T00:00:00.000Z','2017-12-16T00:00:00.000Z' ])
})
