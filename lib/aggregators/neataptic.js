const { getIndicator }  = require('../lib/indicator')

const doRun = async (options) => {
  
  const data = await getIndicator('macd', {
    inputTimestamp: options.start,
  inputIndicator: options.indicator,
  inputSource:options.source,
  inputSize: options.size,
  inputOffset: options.offset
})

}
exports.doRun = doRun