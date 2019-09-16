const { fetchLatestTrades: fetchLatestTradesBTCUSD } = require('./sources/btcusd')

const doFetch = async cp => {
  switch (cp.toLowerCase()) {
    case 'btcusd':
      return fetchLatestTradesBTCUSD(cp)
  }
}

const doStore = async data => {

}

exports.doStore = doStore
exports.doFetch = doFetch
exports.updateTrades = updateTrades



