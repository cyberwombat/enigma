const { test, nock, fresh } = require('../../bootstrap')

test('roundToNearestInterval() floors timestamp to nearest month', t => {
  const { roundToNearestInterval } = fresh('../../lib/utils')

  const date = roundToNearestInterval('2017-12-12T15:27:37.000Z', 'month')
  t.is(date, '2017-12-01T00:00:00.000Z')
})

test('roundToNearestInterval() floors timestamp to nearest 5min', t => {
  const { roundToNearestInterval } = fresh('../../lib/utils')

  const date = roundToNearestInterval('2017-12-12T15:27:37.000Z', 'minute', 5)
  t.is(date, '2017-12-12T15:25:00.000Z')
})

test('roundTransactionTimestamps() rounds timestamps to previous interval', t => {
  const { roundTransactionTimestamps } = fresh('../../lib/utils')

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

test('getTimestampRange() fetches timestamps range based on collection interval', t => {
  const { getTimestampRange } = fresh('../../lib/utils')
  const range = getTimestampRange('1day.btceur', '2017-12-14T17:00:00.000', '2017-12-16T17:00:00.000')
  t.deepEqual(range, [ '2017-12-14T00:00:00.000Z', '2017-12-15T00:00:00.000Z','2017-12-16T00:00:00.000Z' ])
})

test('getTimestampOffsetFromSize() deduces end timestamp from interval', t => {
  const { getTimestampOffsetFromSize } = fresh('../../lib/utils')

  const date = getTimestampOffsetFromSize('2017-12-12T15:27:37.000Z', 47, 'hour', 2)
  t.is(date, '2017-12-08T17:27:37.000Z')
})