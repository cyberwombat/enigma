const { test, fresh } = require('../../../bootstrap')

test.only('doInit()', async t => {
  const { doInit } = fresh('../../../../lib/transactions/sources/hist.bitstamp.btcusd')
  const { getCollectionName } = require('../../../../lib/transactions/loader')
  const { success } = await doInit(getCollectionName('hist', 'bitstamp', 'btcusd'))
  t.truthy(success)
})
