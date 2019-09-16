const { asUTC, asMoment, asTimestamp } = require('./date')

const getTimestampOffsetFromSize = (start, size, period, interval = 1) => {
  let date = asMoment(start)
  date.subtract(interval * (size - 1), period)
  return date.toISOString()
}

const roundToNearestInterval = (timestamp, period, interval) => {
  let m = asUTC(timestamp)

  if (~['months', 'month', 'days', 'day'].indexOf(period)) {
    return m.startOf(period).subtract(interval - 1, period).toISOString()
  } else {
    return m.round(interval, period, 'floor').toISOString()
  }
}

const getTimestampRange = (start, end, period, interval = 1) => {
  let s = asMoment(roundToNearestInterval(start, period, 1))
  let e = asMoment(roundToNearestInterval(end, period, 1))

  let stamps = Array(e.toISOString())
  /* eslint-disable no-unmodified-loop-condition */
  while (s <= e) {
    e.subtract(interval, period)
    stamps.push(e.toISOString())
  }
  /* eslint-enable no-unmodified-loop-condition */

  return stamps.reverse()
}

const getInverseTimestampRangeCount = (date, count, period, interval = 1) => {
  let s = asMoment(roundToNearestInterval(date, period, 1))

  let stamps = Array(s.toISOString())
  for (let i = 1; i < count; i++) {
    s.add(interval, period)
    stamps.push(s.toISOString())
  }

  return stamps
}

const getTimestampRangeCount = (date, count, period, interval = 1) => {
  let s = asMoment(roundToNearestInterval(date, period, 1))

  let stamps = Array(s.toISOString())
  for (let i = count - 1; i > 0; i--) {
    s.subtract(interval, period)
    stamps.push(s.toISOString())
  }

  return stamps.reverse()
}


const getCurrentTimestamp = () => {
  return asTimestamp()
}
exports.getInverseTimestampRangeCount = getInverseTimestampRangeCount
exports.getCurrentTimestamp = getCurrentTimestamp
exports.getTimestampOffsetFromSize = getTimestampOffsetFromSize
exports.getTimestampRange = getTimestampRange
exports.getTimestampRangeCount = getTimestampRangeCount
exports.roundToNearestInterval = roundToNearestInterval
