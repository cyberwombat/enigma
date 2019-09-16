const path = require('path')
const { toConsole } = require('../../../lib/console')
const { runOnce, doSetup, getResults } = require('../../../lib/runner')
const { getTimestampRange } = require('../../../lib/timestamp')
const progress = require('cli-progress')

const bar = new progress.Bar({
  format: 'Analyzing [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} intervals'
}, progress.Presets.shades_classic)

exports.command = 'range'
exports.desc = 'Runs once'
exports.builder = yargs => {
  return yargs.option('c', {
    alias: 'config',
    demandOption: true,
    describe: 'Path to config'
      // type: 'string'
  })
  .option('s', {
    alias: 'start',
    demandOption: true,
    describe: 'Start date'
      // type: 'string'
  })

  .option('e', {
    alias: 'end',
    demandOption: true,
    describe: 'End date'
      // type: 'string'
  })
  .option('p', {
    alias: 'period',
    demandOption: true,
    describe: 'Period to use (day, min, etc)'

  })
  .option('i', {
    alias: 'interval',
    demandOption: false,
    describe: 'Period interval',
    default: 1
  })
 .help(false)
 .version(false)
}
exports.handler = async argv => {
  try {
    const params = require(path.resolve(argv.config))
    await doSetup(params)
    let stamps = getTimestampRange(argv.start, argv.end, argv.period, argv.inteval)
    bar.start(stamps.length, 0)

    for (let stamp of stamps) {
      await runOnce(stamp)
      bar.increment()
    }

    bar.stop()
    const results = await getResults()

    toConsole(results, true)
  } catch (e) {
    toConsole(e)
  }
}
