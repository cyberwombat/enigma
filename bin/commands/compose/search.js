const { getAnalysisData } = require('../../../lib/compose/storage')
const { toConsole } = require('../../../lib/console')

exports.command = 'search'
exports.desc = 'Seach analysis data'
exports.builder = yargs => {
  return yargs.option('c', {
    alias: 'currency',
    demandOption: true,
    describe: 'Currency (ex: BTC)'
       // type: 'string'
  })
  .option('i', {
    alias: 'interval',
    demandOption: false,
    default: 'intraday',
    describe: 'interval - monthly, weekly, daily, intraday'
       // type: 'string'
  })
  .option('f', {
    alias: 'function',
    demandOption: true,
    describe: 'Function to search fo'
       // type: 'string'
  })

  .help(false)
  .version(false)
}
exports.handler = async argv => {
  const data = await getAnalysisData(argv.currency, argv.interval, { fn: argv.function })

  toConsole(data.length ? data : 'No results found', true)

}
