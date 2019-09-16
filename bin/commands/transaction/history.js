const { fetchTradeHistory, storeAsFixtures } = require('../../../lib/transactions/fetcher')
const { toConsole } = require('../../../lib/console')
const { toLower } = require('../../../lib/currency')

exports.command = 'history'
exports.desc = 'Fetches and store historical transaction data and create csv'
exports.builder = yargs => {
  return yargs.option('x', {
    alias: 'exchange',
    demandOption: true,
    describe: 'Exchange'
  }).option('c', {
    alias: 'cp',
    demandOption: true,
    describe: 'Currency Pair (ex: BTC/USDT)'
  })
  .option('s', {
    alias: 'since',
    demandOption: true,
    describe: 'Timestamp to fetch from'
  })
 .help(false)
 .version(false)
}
exports.handler = async argv => {
  try {
    const trades = await fetchTradeHistory(argv.exchange, argv.cp, argv.since)
    const file = `${argv.exchange}.${toLower(argv.cp)}.json`
    const end = trades[0].timestamp
    const start = trades[trades.length - 1].timestamp
    await storeAsFixtures(trades, file)
    toConsole(`${trades.length} trades from ${start} to ${end} written to ${file}`, true)
  } catch (e) {
    toConsole(e)
  }
}
