module.exports = {
  'Twitter sentiment': {
    fn: 'macd',
    collection: '1day.btceur',
    parameters: {
      endIdx: 20,
      optInFastPeriod: 9,
      optInSignalPeriod: 10,
      optInSlowPeriod: 5,
      inReal: 'ref.self.open'
    }
  }}
