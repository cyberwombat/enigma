const config = require('config')
const { fetchData, storeData } = require('../../../lib/harvest/harvester')
const { toConsole } = require('../../../lib/console')

exports.command = 'fetch'
exports.desc = 'Fetches and store market data'
exports.builder = yargs => {
  return yargs.option('c', {
    alias: 'currency',
    demandOption: true,
    describe: 'Currency (ex: BTC)'
       // type: 'string'
  })
  .option('m', {
    alias: 'market',
    demandOption: false,
    default: 'USD',
    describe: 'Market (ex: USD)'
    // type: 'string'
  })
  .option('s', {
    alias: 'source',
    demandOption: false,
    default: 'alphavantage',
    describe: 'Source (ex: alphavantage)'
       // type: 'string'
  })
  .option('i', {
    alias: 'interval',
    demandOption: false,
    default: 'intraday',
    describe: 'interval - monthly, weekly, daily, intraday'
       // type: 'string'
  })

  .option('d', {
    alias: 'store',
    demandOption: false,
    default: false,
    describe: 'Whether to store data in db'
       // type: 'string'
  })

  .help(false)
  .version(false)
}
exports.handler = async argv => {
  const entries = await fetchData({
    transport: argv.source,
    currency: argv.currency,
    market: argv.market,
    interval: argv.interval
  }, { apikey: config.alphavantage.key })

  toConsole(entries[0], true)
}
