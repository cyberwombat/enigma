const Logger = require('bunyan')
const Stream = require('stream')

let logger
let stream
const getLogger = () => {
  if (!logger) doInit()
  return logger
}

const doInit = () => {
  stream = new Stream()
  stream.writable = true

  stream.write = function (obj) {
    console.log(obj.msg)
  }

  logger = new Logger({
    name: 'enigma',
    streams: [{
      type: 'raw',
      stream: stream
    }],
    serializers: {
      err: Logger.stdSerializers.err,
      req: Logger.stdSerializers.req,
      res: Logger.stdSerializers.res
    }
  })
}
const doLog = async (msg, data) => {
  const log = getLogger()
  log.info(msg, data || '')
}
exports.doLog = doLog
exports.doInit = doInit
exports.getLogger = getLogger
