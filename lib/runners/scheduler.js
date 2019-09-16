const { runSequence, doInit } = require('./sequence')
const { getTimestampRange } = require('../timestamp')
const repeatSequence = async (start, end, period, interval, options) => {
  let stamps = getTimestampRange(start, end, period, interval)

  await doInit()
  let results = []
  for (let stamp of stamps) {
    results.push(await runSequence(stamp, options))
  }
  return results
}
exports.repeatSequence = repeatSequence
