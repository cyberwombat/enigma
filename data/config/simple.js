module.exports = {
  name: 'Simple Runner',
  description: 'A simple paper runner',
  version: '0.1.0',
  trader: {
    type: 'paper',
    options: {
      exchange: 'binance',
      cp: 'btcusd'
    }
  },

  srategy: {
    type: 'simple',
    options: {

    }
  },
  aggregator: {
    type: 'neataptic',
    options: {
      indicators: [{
        type: 'macd',
        options: {}
      }]
    }
  },
  modulator: {
    type: 'genetic',
    config: {
      options: {
        size: [2, 3, 4]
      }
    }
  }
}
