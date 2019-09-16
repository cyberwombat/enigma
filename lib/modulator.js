const path = require('path')
const runModulator = async (name, options) => {
  const { doRun } = require(path.resolve('../modulators', name))
  return doRun(options)
}
exports.runModulator = runModulator
