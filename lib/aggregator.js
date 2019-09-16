const path = require('path')
const runAggregator = async (name, options) => {
  const { doRun } = require(path.resolve( '../aggregators', name))
  return doRun(options)
}
exports.runAggregator = runAggregator
