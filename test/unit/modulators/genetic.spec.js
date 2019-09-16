 const { test } = require('../../bootstrap')

 test('getRandomMutationIndex() returns random adjusted mutation rate', t => {
   const { getRandomMutationIndex } = require('../../../../functions/modulators/genetic')
   let valid = true
   for (var i = 100 - 1; i >= 0; i--) {
     if (getRandomMutationIndex(100, 0.2) > 20) { valid = false }
   }

   t.truthy(valid)
 })

 test('mutateGene() mutates a gene', t => {
   const { mutateGene } = require('../../../../functions/modulators/genetic')

   const dna = {
     foo: 1
   }

   const mutations = {
     foo: 2
   }

   const res = mutateGene(dna, mutations, 1)
   t.is(res.foo, 2)
 })

 test('spreadProps()', t => {
   const { spreadProps } = require('../../../../functions/modulators/genetic')

   const res = spreadProps({ a: 'b' })
   t.deepEqual(res, [{ a: 'b' }])
 })

 test('shrinkProps()', t => {
   const {shrinkProps} = require('../../../../functions/modulators/genetic')
   const res = shrinkProps([{ a: 'b' }, { c: 'd' }])
   t.deepEqual(res, { a: 'b', c: 'd' })
 })
 test.only('doEvolve() runs the genetic algorithm', async t => {
   const { doEvolve, randomExt } = require('../../../../functions/modulators/genetic')

   const getMutations = () => {
     return {
       a: randomExt.integer(100, 0),
       b: randomExt.integer(100, 0),
       c: randomExt.integer(100, 0)
     }
   }

   const createGene = () => {
     return Object.assign({}, {
       a: 1,
       b: 2,
       c: 3
     }, getMutations())
   }

   const params = {
     generationSize: 10,
     generationLimit: 100,
     baseProperties: createGene(),
     crossoverRate: 0.2,
     mutationRate: 0.25,
     selectorStrategy: 'tournament',
     selectorSettings: { tournamentSize: 3 },
     fitnessFn: async function () {
       return Promise.resolve(this.dna.a + this.dna.b + this.dna.c)
     },
     mutableProperties: getMutations,
     crossoverType: 'double'

   }
   const res = await doEvolve(params)
   console.dir(res, { depth: 10 })
 })
