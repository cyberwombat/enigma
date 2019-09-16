const { test, fresh, clear } = require('../../bootstrap')

test('applyFunction() returns MACD indicators', async t => {
  const { applyFunction } = require('../../../lib/indicators/macd')

  const res = await applyFunction({
    inputTimestamp: '2013-07-05T06:10:05.000Z',
    inputIndicator: 'open',
    currencyPair: 'btceur',
    inputSource: 'crytr',
    inputType: 'hist',
    optionLongPeriod: 29,
    optionSignalPeriod: 9,
    optionShortPeriod: 12,
    candleType: 'hour',
    candleInterval: 2
  })

  t.deepEqual(Object.keys(res).sort(), [ 'macdOutput', 'macdSignal', 'macdHistogram' ].sort())
  t.is(res.macdOutput.length, 1)
})

test('applyFunction() returns MACD indicators', async t => {
  const { applyFunction } = require('../../../lib/indicators/macd')

  const res = await applyFunction({
    inputTimestamp: '2013-07-05T06:10:05.000Z',
    inputIndicator: 'open',
    currencyPair: 'btceur',
    inputSource: 'crytr',
    inputType: 'hist',
    resultSize: 10,
    optionLongPeriod: 29,
    optionSignalPeriod: 9,
    optionShortPeriod: 12,
    candleType: 'hour',
    candleInterval: 2
  })

  t.deepEqual(Object.keys(res).sort(), [ 'macdOutput', 'macdSignal', 'macdHistogram' ].sort())
  t.is(res.macdOutput.length, 10)
})
