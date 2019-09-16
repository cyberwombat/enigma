const { test, fresh } = require('../../bootstrap')

test('runStrategy()', async t => {
  const { runStrategy } = fresh('../../lib/strategy')

  const options = {
    indicatorType: 'MACD',
    indicatorOptions: {
      inputStartTimestamp: '2017-12-08T20:44:53.000Z',
      inputIndicator: 'open',
      currencePair: 'btceur',
      optionLongPeriod: 5,
      optionSignalPeriod: 9,
      optionShortPeriod: 2,
      candleType: 'hour',
      candleInterval: 1
    }
  }

  const res = await runStrategy('simple', options)
  t.is(Object.keys(res).length, 3)
})
