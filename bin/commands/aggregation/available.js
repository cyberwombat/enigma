const { toConsole } = require('../../../lib/console')
const { listFiles } = require('../../../lib/file')
const path = require('path')
const config = require('config')

exports.command = 'available'
exports.desc = 'List all implemented functions'
exports.handler = async argv => {
  const files = await listFiles(config.paths.functions)

  toConsole(`  ${String('SOURCE').padEnd(30, ' ')}${String('FUNCTION').padEnd(15, ' ')}${String('COLLECTION').padEnd(20, ' ')}${String('PARAMETERS')}`)
  toConsole('')

  const functions = require(config.paths.functions)

  let entries = functions
         .map(m => {
           let params = []
           for (let p in m.parameters) {
             params.push(`${p}(${m.parameters[p]})`)
           }

           return `${m.name.padEnd(30, ' ')}${m.fn.toUpperCase().padEnd(15, ' ')}${m.collection.padEnd(20, ' ')}${params.join(', ')}`
         })
  toConsole(entries)
}
