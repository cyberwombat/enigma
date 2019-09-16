
const path = require('path')
const config = require('config')

// const { getDataByIndex } = require('../candle/storage')
// const { decontructData } = require('./storage')
// const { getSample } = require('../candle/storage')

const applyFunction = async (name, options) => {
  const { applyFunction: doApply } = require(path.resolve(__dirname, 'indicators', name))

  // let params = await handleReferences({ name: name.toUpperCase(), ...Object.assign({}, options) }, entries)

  return doApply(options)
}

const handleReferences = async (params, entries) => {
  for (let p in params) {
    if (typeof params[p] === 'string' && !!~params[p].indexOf('ref.self')) {
      params[p] = entries[params[p].substr(9)]
    }
  }
  return params
}

const fetchPreset = (preset) => {
  if (!functions[preset]) {
    throw new Error(`Analysis function ${preset} does not exist`)
  }

  return functions[preset]
}
exports.handleReferences = handleReferences
exports.fetchPreset = fetchPreset
exports.applyFunction = applyFunction
