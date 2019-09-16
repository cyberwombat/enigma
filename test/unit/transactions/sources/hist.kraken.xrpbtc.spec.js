const { test, fresh } = require('../../../bootstrap')

test.only('doInit()', async t => {
  const { doInit } = fresh('../../../../lib/transactions/sources/hist.kraken.trxbtc')
  const { getCollectionName } = require('../../../../lib/transactions/loader')
  const { success } = await doInit(getCollectionName('hist', 'kraken', 'xrpbtc'))
  t.truthy(success)
})
