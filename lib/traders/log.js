const { doLog } = require('../logger')

const { onHold, onBuy, onSell, onBuyLimit, onSellLimit, onBuyStopLimit, onSellStopLimit } = require('../signal')
const doInit = async () => {
  onHold(() => doLog('Holding...'))
  onBuy(() => doLog('Buy!'))
  onSell(() => doLog('Sell!'))
  onBuyLimit(() => doLog('Placing buy limit order'))
  onSellLimit(() => doLog('Placing sell limit order'))
  onBuyStopLimit(() => doLog('Placing buy stop limit order'))
  onSellStopLimit(() => doLog('Placing sell stop limit order'))
}

exports.doInit = doInit
