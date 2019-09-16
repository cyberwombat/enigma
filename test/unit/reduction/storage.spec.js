const { test, fresh } = require('../../bootstrap')

test('getCollectionName() returns table name', async t => {
  const { getCollectionName } = fresh('../../lib/reduction/storage')

  const table = getCollectionName({
    cp: 'btcusd',
    interval: 1,
    period: 'month'
  })

  t.is(table, '1month.btcusd')
})

test('getLatestTimestamp() returns last entry by timestamp', async t => {
  const { getLastDate } = fresh('../../lib/reduction/storage')

  const timestamp = await getLastDate('1day.btceur')

  t.is(timestamp.toISOString(), '2017-09-30T00:00:00.000Z')
})

test('filterDataByDate() returns table name', async t => {
  const { filterDataByDate } = fresh('../../lib/reduction/storage')

  const data = filterDataByDate([{
    timestamp: '2017-12-09T22:05:00.000Z'
  }, {
    timestamp: '2017-11-09T22:05:00.000Z'
  }, {
    timestamp: '2017-10-09T22:05:00.000Z'
  }], '2017-10-20T22:05:00.000Z')

  t.is(data.length, 2)
})
