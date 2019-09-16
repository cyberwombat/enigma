const test = require('ava')
const { initProxy, generateURL } = require('mongoprime')
const axios = require('axios')
const fresh = require('import-fresh')
const nock = require('nock')
const sinon = require('sinon')
const clear = require('clear-module')

const request = axios
const fixtures = require('./fixtures')

const prime = () => {
  clear.all('config')
  const { setConnectionURL } = fresh('../lib/db')
  setConnectionURL(generateURL())
}

const proxy = async fixtures => {
  return initProxy({ fixtures })
}

test.beforeEach((t) => prime())

test.before(async (t) => proxy(fixtures))

module.exports = { test, proxy, prime, sinon, clear, request, fresh, nock, fixtures }
