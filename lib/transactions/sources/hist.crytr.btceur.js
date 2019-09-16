const { loadLocalCSV } = require('../../csv')

const startDate = () => '2013-06-08T16:02:36-0500'
const endDate = () => '2014-07-15T09:58:14-0500'

const doInit = async (collection) => {
  return loadLocalCSV(collection, 'historical/crytrEUR.csv.gz')
}
const doUpdate = async () => {

}
exports.doInit = doInit
exports.doUpdate = doUpdate
exports.startDate = startDate
exports.endDate = endDate
