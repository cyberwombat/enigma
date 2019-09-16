const { toConsole } = require('../../../lib/console')
const { applyFunction, fetchPreset } = require('../../../lib/aggregation/analysis')
const { flattenData } = require('../../../lib/aggregation/storage')
const { getSample } = require('../../../lib/reduction/storage')
const config = require('config')

exports.command = 'run <func> <from> [to]'
exports.desc = 'Run function'
exports.handler = async argv => {
  const { collection, fn, name, parameters } = fetchPreset(argv.func)

  try {
    const start = new Date(argv.from)
    const end = new Date(argv.to || argv.from)

    const size = parameters.endIdx || config.analysis.sample
    const offset = parameters.startIdx || 0

    let data = await getSample(collection, date, size, offset)

    const entries = flattenData(data)

    const res = await applyFunction(fn, entries, parameters)

    toConsole(res)
  } catch (e) {
    toConsole(e)
  }
}
