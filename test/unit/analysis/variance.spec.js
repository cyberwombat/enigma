const { test, fresh } = require('../../bootstrap')

test('analyzeVariance() returns ANOVA test', t => {
  const { analyzeVariance } = fresh('../../../lib/analysis/variance')

  const variance = analyzeVariance([1, 2, 6, 2, 6, 1], [6, 7, 2, 2, 7, 3], 'anova')

  t.is(variance, 1.173913043478261)
})
