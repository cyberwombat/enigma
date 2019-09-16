const path = require('path')
const { toConsole } = require('../../../lib/console')
const { runOnce, doSetup, getResults } = require('../../../lib/runner')

exports.command = 'once'
exports.desc = 'Runs once'
exports.builder = yargs => {
  return yargs.option('c', {
    alias: 'config',
    demandOption: true,
    describe: 'Path to config'
      // type: 'string'
  })
  .option('d', {
    alias: 'date',
    demandOption: true,
    describe: 'Date to test'
      // type: 'string'
  })
 .help(false)
 .version(false)
}
exports.handler = async argv => {
  try {
    const params = require(path.resolve(argv.config))
    await doSetup(params)
    await runOnce(argv.date, params)
    const results = await getResults()

    toConsole(results, true)
  } catch (e) {
    toConsole(e)
  }
}
