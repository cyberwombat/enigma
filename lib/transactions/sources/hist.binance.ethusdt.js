const { unixTimestampToIsoTimestamp } = require('../../../../date')
const { loadFixtures } = require('../../../../transactions/fetcher')

const startDate = () => unixTimestampToIsoTimestamp('1315922016')
const endDate = () => unixTimestampToIsoTimestamp('1515669031')

const doInit = async (collection) => {
  return loadFixtures(collection, 'binance.ethusdt.json')
}

const doUpdate = async () => {

}

exports.doUpdate = doUpdate
exports.doInit = doInit
exports.startDate = startDate
exports.endDate = endDate
