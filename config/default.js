
require('dotenv')()
module.exports = {
  db: {
    host: 'mongodb://localhost',
    db: 'enigma'
  },
  alphavantage: {
    key: process.env.ALPHAVANTAGE_KEY
  },
  currencies: ['btcusd', 'btceur'],
  sources: {
    historical: {
      btcusd: 'http://api.bitcoincharts.com/v1/csv/bitstampUSD.csv.gz',
      btceur: 'http://api.bitcoincharts.com/v1/csv/bitstampEUR.csv.gz'
    },
    transactional: {
      btcusd: 'https://www.bitstamp.net/api/v2/transactions/btcusd',
      btceur: 'https://www.bitstamp.net/api/v2/transactions/btceur'
    }
  },
  analysis: {
    sample: 30 // default sample size
  },
  aggregation: {
    functions: require('./modules/modulation')
  },
  twitter: {
    app_key: process.env.TWITTER_APP_KEY,
    app_secret: process.env.TWITTER_APP_TOKEN,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  }
}
