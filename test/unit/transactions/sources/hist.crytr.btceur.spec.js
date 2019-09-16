const { test, fresh } = require('../../../bootstrap')

test.only('doInit()', async t => {
  const { doInit } = fresh('../../../../lib/transactions/sources/hist.crytr.btceur')
  const { getCollectionName } = require('../../../../lib/transactions/loader')
  const { success } = await doInit(getCollectionName('hist', 'cytr', 'btceur'))
  t.truthy(success)
})
