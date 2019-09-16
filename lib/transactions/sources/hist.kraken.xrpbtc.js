const { unixTimestampToIsoTimestamp } = require('../../date')
const { loadLocalCSV } = require('../../csv')

const startDate = () => unixTimestampToIsoTimestamp('1388871179')
const endDate = () => unixTimestampToIsoTimestamp('1468926988')

const doInit = async (collection) => {
  return loadLocalCSV(collection, 'historical/krakenXRP.csv.gz')
}
const doUpdate = async () => {

}
exports.doInit = doInit
exports.doUpdate = doUpdate
exports.startDate = startDate
exports.endDate = endDate
