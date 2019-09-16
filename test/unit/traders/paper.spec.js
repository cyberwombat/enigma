const { test, sinon, fresh } = require('../../bootstrap')

test('getBalance() returns current balance', async t => {
  const { getBalance, doInit } = fresh('../../../lib/traders/paper')

  doInit({ balance: { BTC: 1 }, sources: {} })
  const balance = await getBalance()
  t.is(balance.BTC, 1)
})

test('placeBuyOrder() performs a buy', async t => {
  const { placeBuyOrder, getBalance, doInit } = fresh('../../../lib/traders/paper')

  doInit({ balance: { BTC: 0, EUR: 100 }, sources: { BTCEUR: 'hist.crytr.btceur' } })
  await placeBuyOrder('BTCEUR', 1, 91, '2013-09-08T20:02:36.000Z')
  const balance = await getBalance()
  t.is(balance.EUR, 9)
  t.is(balance.BTC, 1)
})

test('placeBuyOrder() throws on insufficient funds', async t => {
  const { placeBuyOrder, doInit } = fresh('../../../lib/traders/paper')

  doInit({ balance: { BTC: 0, EUR: 1 }, sources: { BTCEUR: 'hist.crytr.btceur' } })
  const error = await t.throws(placeBuyOrder('BTCEUR', 1, 91, '2013-09-08T20:02:36.000Z'))
  t.is(error.message, 'Insufficent funds to withdraw 91EUR')
})

test('placeSellOrder() performs a sell', async t => {
  const { placeSellOrder, getBalance, doInit } = fresh('../../../lib/traders/paper')

  doInit({ balance: { BTC: 1, EUR: 0 }, sources: { BTCEUR: 'hist.crytr.btceur' } })
  await placeSellOrder('BTCEUR', 1, 91, '2013-09-08T20:02:36.000Z')
  const balance = await getBalance()
  t.is(balance.EUR, 91)
  t.is(balance.BTC, 0)
})

test('placeSellOrder() throws on insufficient funds', async t => {
  const { placeSellOrder, doInit } = fresh('../../../lib/traders/paper')

  doInit({ balance: { BTC: 0, EUR: 0 }, sources: { BTCEUR: 'hist.crytr.btceur' } })
  const error = await t.throws(placeSellOrder('BTCEUR', 1, 91, '2013-09-08T20:02:36.000Z'))
  t.is(error.message, 'Insufficent funds to withdraw 1BTC')
})

test('addFunds() adds to a currency', async t => {
  const { addFunds, getBalance } = fresh('../../../lib/traders/paper')

  addFunds('BTC', 1)
  addFunds('BTC', 1)
  const balance = await getBalance()
  t.deepEqual(balance, { BTC: 2 })
})

test('setFunds() sets total for a curency', async t => {
  const { setFunds, getBalance } = fresh('../../../lib/traders/paper')

  setFunds('BTC', 1)
  setFunds('BTC', 1)
  const balance = await getBalance()
  t.deepEqual(balance, { BTC: 1 })
})

test('pullFunds() widthraws from a currency', async t => {
  const { pullFunds, setFunds, getBalance } = fresh('../../../lib/traders/paper')
  setFunds('BTC', 1)
  pullFunds('BTC', 1)
  const balance = await getBalance()
  t.deepEqual(balance, { BTC: 0 })
})

test('pullFunds() throws on insufficient funds', t => {
  const { pullFunds } = fresh('../../../lib/traders/paper')

  const error = t.throws(() => pullFunds('BTC', 1))

  t.is(error.message, 'Insufficent funds to withdraw 1BTC')
})

test('addOrder() adds a market order', async t => {
  const { addOrder, getOrderBook } = fresh('../../../lib/traders/paper')

  await addOrder('buy', 'BTCEUR', 10, 0.342)
  const orders = await getOrderBook()
  t.deepEqual(orders[0], {
    type: 'buy',
    cp: 'BTCEUR',
    amount: 10,
    limit: 0.342
  })
})

test('processOrderBook() finds matching orders', async t => {
  const { placeBuyLimitOrder, processOrderBook, getBalance, doInit } = fresh('../../../lib/traders/paper')
  const { onBuySuccess } = require('../../../lib/signal')

  doInit({ balance: { BTC: 1, EUR: 10000 }, sources: { BTCEUR: 'hist.crytr.btceur' } })

  let spy = sinon.spy()

  onBuySuccess(spy)

  await placeBuyLimitOrder('BTCEUR', 10, 0.342)
  await processOrderBook('BTCEUR', 0.342)
  const balance = await getBalance()
  t.deepEqual(balance, { BTC: 11, EUR: 5324.5 })

  t.truthy(spy.called)
})
test('getCoinQuantity() returns provided fraction of available coins', t => {
  const { getCoinQuantity, doInit } = fresh('../../../lib/traders/paper')
  doInit({ balance: { EUR: 10000 }, sources: { } })
  const q = getCoinQuantity('EUR', 0.2)
  t.is(q, 2000)
})
