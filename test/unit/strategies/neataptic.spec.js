const { test, fresh, nock } = require('../../bootstrap')

test('doRun() returns table name', async t => {
  const { doRun } = fresh('../../lib/strategy/strategies/neataptic')

  const res = doRun()
})