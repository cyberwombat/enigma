// const { hasFunds, setFunds, pullFunds. getFunds } = require('./wallet')
const { splitCurrencies } = require('./currency')

let holdings = {}

let transactionFee = 0
let transactionFeeCurrency = null // Set to BNB or blank to leave to counter

const getHoldings = () => {
  return holdings
}

const setHoldings = (data) => {
  holdings = data
}

// Initialize holdings with exchange/config
const doInit = async () => {

}

const doBuy = async (cp, quantity, price) => {
  const { base, counter } = splitCurrencies(cp)

  pullFunds(counter, quantity * price)
  addFunds(base, quantity)
}

const doSell = async (cp, quantity) => {
  return { result: -1 }
}

const doBuyLimit = async (cp, quantity, limit) => {

}

const doSellLimit = async (cp, quantity, limit) => {

}

const doBuyStopLimit = async (cp, quantity, stop, limit) => {

}

const doSellStopLimit = async (cp, quantity, stop, limit) => {

}

const setTransactionFee = (e) => {
  transactionFee = e
}

const getTransactionFee = () => {
  return transactionFee
}

exports.getTransactIonfee = getTransactIonfee
exports.setTransactIonfee = setTransactIonfee
exports.setHoldings = setHoldings
exports.getHoldings = getHoldings
exports.doInit = doInit
exports.doSellStopLimit = doSellStopLimit
exports.doBuyStopLimit = doBuyStopLimit
exports.doSellLimit = doSellLimit
exports.doBuyLimit = doBuyLimit
exports.doSell = doSell
exports.doBuy = doBuy
