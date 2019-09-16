const moment = require('moment')
require('moment-round')

const asMoment = (date) => {
  return moment(date)
}

const asUTC = (date) => {
  return moment(date).utc()
}

const asDate = (date) => {
  return moment(date).toDate()
}

const asTimestamp = (date) => {
  return moment(date).toISOString()
}

const unixTimestampToIsoTimestamp = (unix) => {
  return moment.unix(unix).toISOString()
}

const isoTimestampToUnixMillisecondTimestamp = (ts) => {
  return moment(ts).valueOf()
}

exports.isoTimestampToUnixMillisecondTimestamp = isoTimestampToUnixMillisecondTimestamp
exports.unixTimestampToIsoTimestamp = unixTimestampToIsoTimestamp
exports.asTimestamp = asTimestamp
exports.asDate = asDate
exports.asUTC = asUTC
exports.asMoment = asMoment
