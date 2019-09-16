const { test, fresh, nock } = require('../../bootstrap')

test('runSequence() runs strategy', async t => {
  const { runSequence, doInit } = fresh('../../../lib/runners/sequence')

  const params = {
    wallet: {
      holdings: {
        'btc': 0.00000123,
        'xrp': 1424.13
      }
    },
    traders: [{
      type: 'log'
    }, {
      type: 'paper',
      options: {
        exchange: 'binance',
        cp: 'btcusd'
      },
      holdings: {
        'btc': 0.00000123,
        'xrp': 1424.13
      }
    }],
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
  await doInit()
  const { result } = await runSequence('2014-02-15T09:58:14-0500', params)

  t.is(result, 0)
})
