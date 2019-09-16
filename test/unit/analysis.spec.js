const { test, fresh } = require('../../bootstrap')

test.only('applyFunction() executes a math function on data', async t => {
  const { applyFunction } = fresh('../../lib/aggregation/analysis')

  const res = await applyFunction('macd', {
    inputTimestamp: '2017-08-31T00:00:00.000Z',
    inputIndicator: 'open',
    inputSource: '1day.btceur',
    inputSize: 20,
    optionLongPeriod: 9,
    optionSignalPeriod: 10,
    optionShortPeriod: 5
  })

  t.deepEqual(Object.keys(res).sort(), [ 'macdOutput', 'macdSignal', 'macdHistogram' ].sort())
  t.is(res.macdOutput.length, 12)
})

