const { test, fresh } = require('../../bootstrap')
const path = require('path')

test.only('loadLocalCSV()', async t => {
  const { loadLocalCSV } = require('../../../lib/transactions/historical')

  const { success } = await loadLocalCSV('btcusd', path.resolve('test/data/bitstampEUR.csv.gz'))
  t.truthy(success)
})

test.skip('loadRemoteCSV()', async t => {
  const { loadRemoteCSV } = require('../../../lib/transactions/historical')
})

test.skip('hasData()', async t => {
  const { hasData } = require('../../../lib/transactions/historical')
})

test.skip('updateHistoricalTransactions()', async t => {
  const { updateHistoricalTransactions } = require('../../../lib/transactions/historical')
})

test.skip('fetchHistoricalTransactions()', async t => {
  const { fetchHistoricalTransactions } = require('../../../lib/transactions/historical')
})
