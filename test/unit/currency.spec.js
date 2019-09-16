const { test, fresh } = require('../bootstrap')

test('splitCurrencies()', t => {
  const { splitCurrencies } = fresh('../../lib/currency')

  const { base, quote } = splitCurrencies('BTC/EUR')

  t.is(base, 'BTC')
  t.is(quote, 'EUR')
})

test('toLower() lowercases and removes slash', t => {
  const { toLower } = fresh('../../lib/currency')
  const cp = toLower('ETH/USDT')
  t.is(cp, 'ethusdt')
})
