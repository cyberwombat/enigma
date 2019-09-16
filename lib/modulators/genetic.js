 const geneLib = require('gene-lib')
 const { doValidate, joi } = require('../../lib/validation')
 const randomExt = require('random-ext')
 const { Chromosome, uniformCrossover, twoPointCrossover, singlePointCrossover, pmx } = geneLib

// Convert props to array of props for crossovers
 const spreadProps = (props) => {
   let arr = []
   for (let p in props) {
     arr.push({ [p]: props[p] })
   }
   return arr
 }

// Convert array of props to object
 const shrinkProps = (arr) => {
   let props = {}
   for (let p of arr) {
     Object.assign(props, p)
   }
   return props
 }

 const doRun = async (options) => {
   const schema = {
     selectorStrategy: joi.string().valid(['tournament', 'roulette']).default('tournament'),
     selectorSettings: joi.object().default({ tournamentSize: 2, baseWeight: 1 }).keys({
       tournamentSize: joi.number().integer().default(2),
       baseWeight: joi.number().integer().default(1)
     }).when('selectorStrategy', {
       is: 'tournament',
       otherwise: joi.strip()
     }),
     generationSize: joi.number().integer().required(),
     generationLimit: joi.number().integer().required(),
     crossoverRate: joi.number(),
     mutationRate: joi.number(),
     baseProperties: joi.any(),
     fitnessFn: joi.func(),
     mutableProperties: joi.func(),
     crossoverType: joi.string().valid(['uniform', 'single', 'double', 'pmx'])
   }

   options = doValidate(options, schema)

   class Gene extends Chromosome {
     constructor (dna) {
       super()
       this.dna = dna

       this.getFitness = options.fitnessFn
     }
     static create (dna) {
       return new this(dna)
     }

     crossover (other) {
       const cx = options.crossoverType === 'pmx' ? pmx : (options.crossoverType === 'single' ? singlePointCrossover : (options.crossoverType === 'double' ? twoPointCrossover : uniformCrossover))

       const kids = cx(spreadProps(this.dna), spreadProps(other.dna))

       return kids.map(kid => new this.constructor(shrinkProps(kid)))
     }
     mutate (rate) {
       const mutations = options.mutableProperties()

       let mutated = mutateGene(this.dna, mutations, options.mutationRate)

       return new this.constructor(mutated)
     }
//  getFitness = options.fitnessFn
}

   const createChromosome = (dna) => {
     return {
       dna: dna,
       mutate: (rate) => {
         const mutations = options.mutateFn()

         dna = mutateGene(dna, mutations, options.mutationRate)

         return createChromosome(dna)
       },

       crossover: (other) => {
         return [other, other]
       },
       getFitness: options.fitnessFn
         // mutate: options.mutator,
         // crossover: options.crossover}
     }
   }

   return geneLib.run({
     async: {
       getFitness: true
     },
     selector: options.selectorStrategy,
     chromosomeClass: Gene,
     generationSize: options.generationSize,
     generationLimit: options.generationLimit,
     createArg: options.baseProperties,
     crossoverRate: options.crossoverRate,
     mutationRate: options.mutationRate
   })
 }

 const mutateGene = (gene, mutations, rate) => {
   return Object.keys(mutations).reduce((g, k) => {
     if (Math.random() <= rate) { g[k] = mutations[k] }
     return g
   }, gene)
 }

 exports.spreadProps = spreadProps
 exports.shrinkProps = shrinkProps
 exports.mutateGene = mutateGene
 exports.randomExt = randomExt
 exports.doRun = doRun
