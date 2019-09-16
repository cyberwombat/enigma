const { test, fresh } = require('../../../../bootstrap')

test.only('loadHistory()', async t => {
  const { loadHistory } = fresh('../../../lib/transactions/sources/historical/kraken.trxbtc')

  const { success } = await loadHistory()
  t.truthy(success)
})
