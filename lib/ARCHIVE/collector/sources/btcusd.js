nconst { transportFetchLatestTransactions, transportFetchHistoricalTransactions } = require('../transports/bitstamp')

const doFetchLatestTransactions = async (source) => transportFetchLatestTransactions(source)

const doFetchHistoricalTransactions = async (source) => transportFetchHistoricalTransactions(source)

exports.doFetchHistoricalTransactions = doFetchHistoricalTransactions
exports.doFetchLatestTransactions = doFetchLatestTransactions
