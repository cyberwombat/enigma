const { test, fresh, nock } = require('../../bootstrap')

test('repeatSequence() runs strategy', async t => {
  const { repeatSequence } = fresh('../../../lib/runners/scheduler')

  const params = {
    trader: {
      type: 'paper',
      options: {
        exchange: 'binance',
        cp: 'btcusd'
      }
    },
    strategy: {
      type: 'macd',
      options: {
        inputIndicator: 'open',
        currencyPair: 'btceur',
        inputSource: 'crytr',
        inputType: 'hist',
        optionLongPeriod: 5,
        optionSignalPeriod: 9,
        optionShortPeriod: 2,
        candleType: 'hour',
        candleInterval: 1
      }
    }

  }

  const results = await repeatSequence('2014-02-14T09:58:14-0500', '2014-02-15T09:58:14-0500', 'hour', 1, params)
  t.is(results.length, 25)
})
