const { test, fresh, sinon } = require('../../bootstrap')

test('runStrategy() runs tulip indicator strategy', async t => {
  const { doRun } = fresh('../../../lib/strategies/macd')
  const { onSell } = require('../../../lib/signal')
  const options = {
    inputIndicator: 'open',
    currencyPair: 'btceur',
    inputSource: 'crytr',
    inputType: 'hist',
    resultSize: 2,
    optionLongPeriod: 29,
    optionSignalPeriod: 9,
    optionShortPeriod: 12,
    candleType: 'hour',
    candleInterval: 1
  }

  const spy = sinon.spy()

  onSell(spy)

  await doRun('2013-07-05T06:10:05.000Z', options)

  t.truthy(spy.called)
})
