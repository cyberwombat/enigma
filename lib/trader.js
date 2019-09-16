const path = require('path')
const { splitCurrencies } = require('./currency')
const { onHold, onBuy, onSell, onBuyLimit, onSellLimit } = require('./signal')
const { doLog } = require('./logger')

let trader = null
let history = []

const setTrader = (name) => {
  try {
    trader = require(path.resolve('lib/traders', name))
  } catch (err) {
    throw new Error(`Unable to find ${name} trader`)
  }
}

const getTrader = () => {
  if (!trader) throw new Error('No trader set!')
  return trader
}

// Initialize holdings with exchange/config
const loadTrader = (name, options) => {
  setTrader(name)
  const { doInit } = getTrader()
  doInit(options)
  onHold(doHold)
  onBuy(doBuy)
  onSell(doSell)
  onBuyLimit(doBuyLimit)
  onSellLimit(doSellLimit)
}

const getCurrentBalance = async () => {
  const { getBalance } = getTrader()
  return getBalance()
}

const doHold = async (cp) => {
 // doLog('hold', { cp })
}

const doBuy = async (cp, price, ratio = 1) => {
  const { base } = splitCurrencies(cp)
  const { placeBuyOrder, getCoinQuantity } = getTrader()
  const quantity = getCoinQuantity(base, ratio)
  try {
    await placeBuyOrder(cp, quantity)
    logTrade('buy', { cp, quantity })
  } catch (e) {
    throw new Error(e)
  }
}

const doSell = async (cp, price, ratio = 1) => {
  const { base } = splitCurrencies(cp)
  const { placeSellOrder, getCoinQuantity } = getTrader()
  const quantity = getCoinQuantity(base, ratio)
  try {
    await placeSellOrder(cp, quantity)
    logTrade('sell', { cp, quantity })
  } catch (e) {
    throw new Error(e)
  }
}

const doBuyLimit = async (cp, limit, ratio = 1) => {
  const { base } = splitCurrencies(cp)
  const { placeBuyLimitOrder, getCoinQuantity } = getTrader()
  const quantity = getCoinQuantity(base, ratio)
  try {
    await placeBuyLimitOrder(cp, quantity, limit)
    logTrade('buylimit', { cp, quantity, limit })
  } catch (e) {
    throw new Error(e)
  }
}

const doSellLimit = async (cp, limit, ratio = 1) => {
  const { base } = splitCurrencies(cp)
  const { placeSellLimitOrder, getCoinQuantity } = getTrader()
  const quantity = getCoinQuantity(base, ratio)
  try {
    await placeSellLimitOrder(cp, quantity, limit)
    logTrade('selllimit', { cp, quantity, limit })
  } catch (e) {
    throw new Error(e)
  }
}

const logTrade = (type, params) => {
  doLog(type, params)
  history.push({ type, params })
}
const getHoldings = async () => {
  const { getBalance } = getTrader()
  return getBalance()
}

const getHistory = async () => {
  return history
}
exports.getHoldings = getHoldings
exports.getHistory = getHistory
exports.logTrade = logTrade
exports.getCurrentBalance = getCurrentBalance
exports.loadTrader = loadTrader
exports.doSellLimit = doSellLimit
exports.doBuyLimit = doBuyLimit
exports.doSell = doSell
exports.doBuy = doBuy
exports.doHold = doHold
exports.getTrader = getTrader
exports.setTrader = setTrader
