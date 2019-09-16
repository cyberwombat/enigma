const { test, nock, fresh } = require('../bootstrap')

test('roundToNearestInterval() floors timestamp to nearest month', t => {
  const { roundToNearestInterval } = fresh('../../lib/timestamp')

  const date = roundToNearestInterval('2017-12-12T15:27:37.000Z', 'month')
  t.is(date, '2017-12-01T00:00:00.000Z')
})

test('roundToNearestInterval() floors timestamp to nearest day', t => {
  const { roundToNearestInterval } = fresh('../../lib/timestamp')

  const date = roundToNearestInterval('2017-12-14T17:00:00.000Z', 'day')
  t.is(date, '2017-12-14T00:00:00.000Z')
})

test('roundToNearestInterval() floors timestamp to nearest 5min', t => {
  const { roundToNearestInterval } = fresh('../../lib/timestamp')

  const date = roundToNearestInterval('2017-12-12T15:27:37.000Z', 'minute', 5)
  t.is(date, '2017-12-12T15:25:00.000Z')
})

test('getTimestampRange() fetches timestamps range based on collection interval', t => {
  const { getTimestampRange } = fresh('../../lib/timestamp')
  const range = getTimestampRange('2017-12-14T17:00:00.000Z', '2017-12-16T17:00:00.000Z', 'day')
  t.deepEqual(range, [ '2017-12-14T00:00:00.000Z', '2017-12-15T00:00:00.000Z', '2017-12-16T00:00:00.000Z' ])
})

test('getTimestampRange() handles intervals greater than 1', t => {
  const { getTimestampRange } = fresh('../../lib/timestamp')
  const range = getTimestampRange('2017-12-14T12:02:00.000Z', '2017-12-14T17:02:00.000Z', 'hour', 2)
  t.deepEqual(range, [ '2017-12-14T11:00:00.000Z', '2017-12-14T13:00:00.000Z', '2017-12-14T15:00:00.000Z', '2017-12-14T17:00:00.000Z' ])
})

test('getTimestampOffsetFromSize() deduces end timestamp from interval', t => {
  const { getTimestampOffsetFromSize } = fresh('../../lib/timestamp')

  const date = getTimestampOffsetFromSize('2017-12-12T15:27:37.000Z', 47, 'hour', 2)
  t.is(date, '2017-12-08T17:27:37.000Z')
})

test('getTimestampRangeCount() fetches timestamps range based on count', t => {
  const { getTimestampRangeCount } = fresh('../../lib/timestamp')
  const range = getTimestampRangeCount('2017-12-14T17:00:00.000Z', 5, 'hour', 2)
  t.deepEqual(range, [
    '2017-12-14T09:00:00.000Z',
    '2017-12-14T11:00:00.000Z',
    '2017-12-14T13:00:00.000Z',
    '2017-12-14T15:00:00.000Z',
    '2017-12-14T17:00:00.000Z'
  ])
})


test('getInverseTimestampRangeCount() fetches timestamps range based on count', t => {
  const { getInverseTimestampRangeCount } = fresh('../../lib/timestamp')
  const range = getInverseTimestampRangeCount('2017-12-14T17:00:00.000Z', 5, 'hour', 2)
 
  t.deepEqual(range, [ 
    '2017-12-14T17:00:00.000Z',
  '2017-12-14T19:00:00.000Z',
  '2017-12-14T21:00:00.000Z',
  '2017-12-14T23:00:00.000Z',
  '2017-12-15T01:00:00.000Z' 
    ])
})
