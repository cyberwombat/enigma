const { toConsole } = require('../../../lib/console')
const data = require('../../../data/analysis/talib.json')

exports.command = 'list'
exports.desc = 'List all analysis functions'
exports.handler = argv => {
  toConsole(data)
}
