const { test, fresh } = require('../../bootstrap')

test('doProcess() applies functions to a date range', async t => {
  const { doProcess } = fresh('../../lib/aggregation/run')

  const {success, count} = await doProcess('BTC - MACD', '2017-09-12T17:00:00.000', '2017-09-14T17:00:00.000')
  t.truthy(success)
  t.is(count, 3)
})

test('doProcess() applies and stores analysis for one date', async t => {
  const { doProcess } = fresh('../../lib/aggregation/run')

  const { success, count } = await doProcess('BTC - MACD', '2017-09-14T17:00:00.000')
  t.truthy(success)
  t.is(count, 1)
})
