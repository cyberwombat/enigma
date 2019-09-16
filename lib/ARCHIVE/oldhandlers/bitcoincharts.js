const { loadRemoteCSV } = require('../../historical')

const getTransactions = async (cp, source) => {
  return loadRemoteCSV(cp, source)
}

exports.getTransactions = getTransactions
