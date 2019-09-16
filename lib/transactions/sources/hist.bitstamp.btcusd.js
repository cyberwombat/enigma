const { unixTimestampToIsoTimestamp } = require('../../../../date')
const { loadLocalCSV } = require('../../../../csv')

const startDate = () => unixTimestampToIsoTimestamp('1315922016')
const endDate = () => unixTimestampToIsoTimestamp('1515669031')

const doInit = async (collection) => {
  return loadLocalCSV(collection, 'historical/bitstampUSD.csv.gz')
}

const doUpdate = async () => {

}

exports.doUpdate = doUpdate
exports.doInit = doInit
exports.startDate = startDate
exports.endDate = endDate
