 const { getTransactions } = require('../../handlers/bicoincharts')
 const { unixTimestampToIsoTimestamp } = require('../../../../date')
 const { loadLocalCSV } = require('../../../../csv')

 const startDate = () => unixTimestampToIsoTimestamp('1315922016')
 const endDate = () => unixTimestampToIsoTimestamp('1515669031')

 const source = 'historical/bitstampUSD.csv.gz'

 const collection = 'historical.bitstamp.btcusd'

 const fetchTransactions = async () => getTransactions(source)

 const loadHistory = async () => {
   return loadLocalCSV(collection, source)
 }
 exports.loadHistory = loadHistory

 exports.startDate = startDate
 exports.endDate = endDate
 exports.fetchTransactions = fetchTransactions
