const { doValidate, joi } = require('../validation')
const { splitCurrencies } = require('../currency')
const { getTicker, destructureSource } = require('../transaction')
const { doBuySuccess, doSellSuccess } = require('../signal')
let store = {
  sources: {},
  balance: {}
}

let orders = []

const schema = joi.object().keys({
  sources: joi.object().required(), // cp -> source
  balance: joi.object().required()
})

// Fetch balance, etc
const doInit = (options) => {
  store = doValidate(options, schema)
}

const getOrderBook = async () => {
  return orders
}

const cancelOrder = async (cp, amount) => {
  orders.splice(orders.findIndex(o => o.cp === cp && o.amount === amount, 1))
}

const processOrder = async (type, cp, amount, limit, date) => {
  if (type === 'buy') return processBuyLimitOrder(cp, amount, limit, date)
  if (type === 'sell') return processSellLimitOrder(cp, amount, limit, date)
}
const addOrder = async (type, cp, amount, limit) => {
  orders.push({ type, cp, amount, limit })
}

const processOrderBook = async (cp, price, date) => {
  const actionables = orders.filter(o =>
    o.cp === cp && ((o.type === 'buy' && o.limit <= price) || (o.type === 'sell' && o.limit >= price))
  )

  let runs = actionables.map(a => {
    const { type, cp, amount, limit } = a
    return processOrder(type, cp, amount, limit, date)
  })
  return Promise.all(runs)
}

const getSource = (cp) => {
  if (!store.sources.cp) throw new Error(`No source provided for ${cp}`)
  return destructureSource(store.sources.cp)
}

const getTickerFromSource = async (source, date) => {
  if (!store.sources[source]) throw new Error(`No source provided for ${source}`)
  const { type, ex, cp } = destructureSource(store.sources[source])
  return getTicker(type, ex, cp, date)
}

const getBalance = async () => {
  return store.balance
}

const processBuyLimitOrder = async (cp, amount, limit, date) => {
  const { price } = await getTickerFromSource(cp, date)

  const { base, quote } = splitCurrencies(cp)

  pullFunds(quote, price * amount, false)
  addFunds(base, amount)
  addFunds(quote, limit * amount)
  doBuySuccess(cp, amount, price, date)
}
const processSellLimitOrder = async (cp, amount, limit, date) => {
  const { price } = await getTickerFromSource(cp, date)
  const { base, quote } = splitCurrencies(cp)
  pullFunds(base, amount, false)
  addFunds(quote, price * amount)
  addFunds(base, limit * amount)
  doSellSuccess(cp, amount, price, date)
}
const placeBuyOrder = async (cp, amount, ticker, date) => {
  const { price } = await getTickerFromSource(cp, date)

  const { base, quote } = splitCurrencies(cp)

  pullFunds(quote, price * amount)
  addFunds(base, amount)

  doBuySuccess(cp, amount, price, date)
}
const placeSellOrder = async (cp, amount, ticker, date) => {
  const { price } = await getTickerFromSource(cp, date)
  const { base, quote } = splitCurrencies(cp)
  pullFunds(base, amount)
  addFunds(quote, price * amount)
  doSellSuccess(cp, amount, price, date)
}
const placeBuyLimitOrder = async (cp, amount, limit, date) => {
  const { quote } = splitCurrencies(cp)
  pullFunds(quote, limit * amount)
  addOrder('buy', cp, amount, limit, date)
}
const placeSellLimitOrder = async (cp, amount, limit, date) => {
  const { base } = splitCurrencies(cp)
  pullFunds(base, amount)
  addOrder('sell', cp, amount, limit, date)
}

const getCoinQuantity =  (currency, ratio) => {
  const c = getFunds(currency)
  return c * ratio
}

const hasFunds = (currency, amount) => {
  const current = getFunds(currency)
  return current >= amount
}

const setFunds = (currency, amount) => {
  store.balance[currency] = amount
}

const addFunds = (currency, amount) => {
  const current = getFunds(currency)
  setFunds(currency, current + amount)
}
const pullFunds = (currency, amount, verify = true) => {
  if (verify && !hasFunds(currency, amount)) { throw new Error(`Insufficent funds to withdraw ${amount}${currency}`) }

  const current = getFunds(currency)
  setFunds(currency, current - amount)
}

const getFunds = (currency) => {
  return store.balance[currency] ? store.balance[currency] : 0
}
exports.processBuyLimitOrder = processBuyLimitOrder
exports.processSellLimitOrder = processSellLimitOrder
exports.addOrder = addOrder
exports.processOrder = processOrder
exports.processOrderBook = processOrderBook
exports.cancelOrder = cancelOrder
exports.getOrderBook = getOrderBook
exports.getTickerFromSource = getTickerFromSource
exports.getSource = getSource
exports.setFunds = setFunds
exports.pullFunds = pullFunds
exports.addFunds = addFunds
exports.getFunds = getFunds
exports.hasFunds = hasFunds
exports.doInit = doInit
exports.getCoinQuantity = getCoinQuantity
exports.getBalance = getBalance
exports.placeSellOrder = placeSellOrder
exports.placeBuyOrder = placeBuyOrder
exports.placeSellLimitOrder = placeSellLimitOrder
exports.placeBuyLimitOrder = placeBuyLimitOrder
