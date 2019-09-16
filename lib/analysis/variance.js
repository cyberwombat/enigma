const levene = require('levene-test') // https://github.com/lukem512/levene-test
const mwu = require('mann-whitney-utest') // https://github.com/lukem512/mann-whitney-utest
const bf = require('brown-forsythe-test') // https://github.com/lukem512/brown-forsythe-test
const anova = require('anova') // https://github.com/lukem512/anova

const analyzeVariance = (s1, s2, method) => {
  const samples = [s1, s2]

  switch (method) {
    case 'anova':
      return anova.test(samples)
    case 'levene':
      return levene.test(samples)
    case 'bf':
      return bf.test(samples)
    case 'mwu':
      return mwu.test(samples)
    default:
      throw new Error('No variance analysis method provided')
  }
}

exports.analyzeVariance = analyzeVariance
