const { test, fresh, nock } = require('../bootstrap')

// TODO we need to create tmp dir and read it to test
test.skip('createLocalCSV()', async t => {
  const { createLocalCSV } = fresh('../../lib/csv')

  const res = await createLocalCSV([{ foo: 'bar', f: 's' }, { foo: 'bar', f: 'q' }], './TEST.csv')
  
})

