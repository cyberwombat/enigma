const { EventEmitter } = require('events')

let emitter

const doHold = (cp) => {
  doEmit('hold', { cp })
}

const doBuy = (cp, amount) => {
  doEmit('buy', { cp, amount })
}

const doSell = (cp, amount) => {
  doEmit('sell', { cp, amount })
}

const doBuyLimit = (cp, amount, limit) => {
  doEmit('buylimit', { cp, amount, limit })
}

const doSellLimit = (cp, amount, limit) => {
  doEmit('selllimit', { cp, amount, limit })
}

const doBuyStopLimit = (cp, amount, stop, limit) => {
  doEmit('buystoplimit', { cp, amount, stop, limit })
}

const doSellStopLimit = (cp, amount, stop, limit) => {
  doEmit('sellstoplimit', { cp, amount, stop, limit })
}

const onHold = (fn) => {
  onEmit('hold', fn)
}
const onBuy = (fn) => {
  onEmit('buy', fn)
}
const onSell = (fn) => {
  onEmit('sell', fn)
}
const onBuyLimit = (fn) => {
  onEmit('buylimit', fn)
}
const onSellLimit = (fn) => {
  onEmit('selllimit', fn)
}
const onBuyStopLimit = (fn) => {
  onEmit('buystoplimit', fn)
}
const onSellStopLimit = (fn) => {
  onEmit('sellstoplimit', fn)
}

const onBuySuccess = (fn) => {
  onEmit('buysuccess', fn)
}
const onSellSuccess = (fn) => {
  onEmit('sellsuccess', fn)
}

const doBuySuccess = (cp, amount, price, date) => {
  doEmit('buysuccess', { cp, amount, price, date })
}
const doSellSuccess = (cp, amount, price, date) => {
  doEmit('sellsuccess', { cp, amount, price, date })
}

const doEmit = (event, data) => {
  const e = getEmitter()
  e.emit.apply(e, [event, ...Object.values(data)])
}
const onEmit = (event, fn) => {
  const e = getEmitter()

  e.on(event, fn)
}
const getEmitter = () => {
  if (!emitter) emitter = new EventEmitter()
  return emitter
}
exports.onBuySuccess = onBuySuccess
exports.onSellSuccess = onSellSuccess
exports.doBuySuccess = doBuySuccess
exports.doSellSuccess = doSellSuccess
exports.onHold = onHold
exports.onBuy = onBuy
exports.onSell = onSell
exports.onBuyLimit = onBuyLimit
exports.onSellLimit = onSellLimit
exports.onBuyStopLimit = onBuyStopLimit
exports.onSellStopLimit = onSellStopLimit
exports.doHold = doHold
exports.onEmit = onEmit
exports.doEmit = doEmit
exports.getEmitter = getEmitter
exports.doSellStopLimit = doSellStopLimit
exports.doBuyStopLimit = doBuyStopLimit
exports.doSellLimit = doSellLimit
exports.doBuyLimit = doBuyLimit
exports.doSell = doSell
exports.doBuy = doBuy
