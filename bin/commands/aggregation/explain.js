const { toConsole } = require('../../../lib/console')
const { explain } = require('talib')
const { indicators } = require('tulind')
const links = require('../../../data/analysis/documentation.json')

const defaults = ['https://cryptotrader.org/talib']

exports.command = 'explain <func>'
exports.desc = 'explain function'
exports.builder = yargs => {
  return yargs.option('s', {
    alias: 'source',
    demandOption: false,
    describe: 'Source (i.e. tulip)',
    default: 'tulip',
    choices: ['tulip', 'talib']
  })

  .help(false)
  .version(false)
}
exports.handler = argv => {
  let d

  switch (argv.source) {
    case 'tulip':
      d = indicators[argv.func.toLowerCase()]
      break
    case 'talib':
      d = explain(argv.func.toUpperCase())
      break
  }

  if (!Object.keys(d).length) toConsole('Command not found')
  else {
    if (links[argv.func.toUpperCase()]) {
      d.links = defaults.concat(links[argv.func.toUpperCase()])

      if (argv.source === 'tulip') { d.links.push('https://tulipindicators.org/' + argv.func.toLowerCase()) }
    }
    toConsole(d)
  }
}
