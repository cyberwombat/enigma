const { test, fresh } = require('../../bootstrap')

test('getCollectionName() returns collection name', t => {
  const { getCollectionName } = fresh('../../lib/aggregation/storage')

  const c = getCollectionName()

  t.is(c, 'aggregations')
})

test('storeFunctionResult()', async t => {
  const { storeFunctionResult, getAnalysisData } = fresh('../../lib/aggregation/storage')

  const params = {
    results: {
      outReal: [ 1, 2, 4, 8, 4, 5 ]
    },
    timestamp: new Date('2017-12-11T00:06:20.410Z'),
    collection: '1day.btcusd',
    fn: 'adx',
    parameters: {
      endIdx: 50,
      optInTimePeriod: 9
    }
  }
  const { success } = await storeFunctionResult(params)
  const results = await getAnalysisData({ timestamp: new Date('2017-12-11T00:06:20.410Z'), collection: '1day.btcusd' })
  t.truthy(success)
  t.is(results[0].fn, 'adx')
})

test('storeFunctionResult()', async t => {
  const { getAnalysisData } = fresh('../../lib/aggregation/storage')

  const results = await getAnalysisData({ collection: '10day.btcusd' })

  t.is(results.length, 2)
})
