const { test, sinon, fresh } = require('../bootstrap')

test('loadTrader() sets trader', t => {
  const { loadTrader } = fresh('../../lib/trader')

  loadTrader('paper', { balance: { BTC: 1, EUR: 10000 }, sources: { BTCEUR: 'hist.crytr.btceur' } })
  t.pass()
})

test('loadTrader() throws on invalid trader', t => {
  const { loadTrader } = fresh('../../lib/trader')

  const error = t.throws(() => loadTrader('foo'))
  t.is(error.message, 'Unable to find foo trader')
})

test('getTrader() returns trader', t => {
  const { getTrader, setTrader } = fresh('../../lib/trader')

  setTrader('paper')
  const trader = getTrader()
  t.truthy(typeof trader !== 'undefined')
})

test('getTrader() throws on no trader', t => {
  const { getTrader } = fresh('../../lib/trader')

  const error = t.throws(() => getTrader())
  t.is(error.message, 'No trader set!')
})

test('doBuy() triggers a purchase', async t => {
  const { doBuy, loadTrader } = fresh('../../lib/trader')
  const { onBuySuccess } = require('../../lib/signal')
  loadTrader('paper', { balance: { BTC: 1, EUR: 10000 }, sources: { BTCEUR: 'hist.crytr.btceur' } })
  let spy = sinon.spy()

  onBuySuccess(spy)
  await doBuy('BTCEUR', 1, 0.5)
  t.truthy(spy.called)
})

test.only('doSell() triggers a sale', async t => {
  const { doSell, loadTrader } = fresh('../../lib/trader')
  const { onSellSuccess } = require('../../lib/signal')
  loadTrader('paper', { balance: { BTC: 1, EUR: 10000 }, sources: { BTCEUR: 'hist.crytr.btceur' } })
  let spy = sinon.spy()

  onSellSuccess(spy)
  await doSell('BTCEUR', 1, 0.5)
  t.truthy(spy.called)
})
