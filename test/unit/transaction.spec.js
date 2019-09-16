const { test, fresh, nock } = require('../../bootstrap')

test.only('findTransactions()', async t => {
  const { findTransactions } = fresh('../../../lib/transaction')

  const res = await findTransactions('hist', 'kraken', 'xrpusd')
  t.truthy(res)
})


test.only('isInitialized()', async t => {
  const { isInitialized } = fresh('../../../lib/transactions/loader')

  const res = await isInitialized('hist', 'kraken', 'xrpusd')
  t.falsy(res)
})
