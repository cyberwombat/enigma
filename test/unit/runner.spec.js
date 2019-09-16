const { test, fresh, clear } = require('../bootstrap')

test('runOnce() runs strategy for a single date', async t => {
  const { runOnce, doSetup } = fresh('../../lib/runner')

  const params = {
    trader: {
      type: 'paper',
      options: {
        sources: {
          BTCUSD: 'hist.crytr.btceur'
        },
        balance: {
          'BTC': 0.00000123,
          'XRP': 1424.13
        }
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
  await doSetup(params)
  await runOnce('2014-02-15T14:58:14.000Z', params)
  // const results = await getResults()
  // console.log(results)
  t.truthy(true)
})

test('runUntil() runs strategy', async t => {
  const { runUntil, doSetup } = fresh('../../lib/runner')

  const params = {
    trader: {
      type: 'paper',
      options: {
        sources: {
          BTCUSD: 'hist.crytr.btceur'
        },
        balance: {
          'BTC': 0.00000123,
          'XRP': 1424.13
        }
      }
    },
    strategy: {
      type: 'macd',
      options: {
        inputIndicator: 'open',
        currencyPair: 'btceur',
        inputSource: 'crytr',
        inputType: 'hist',
        optionLongPeriod: 25,
        optionSignalPeriod: 9,
        optionShortPeriod: 12,
        candleType: 'hour',
        candleInterval: 1

      }
    }
  }
  await doSetup(params)
  await runUntil('2014-02-14T09:58:14-0500', '2014-02-15T09:58:14-0500', 'hour', 1, params)
  t.truthy(true)
})
