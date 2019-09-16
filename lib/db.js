const config = require('config')
const { MongoClient, ObjectId } = require('mongodb')
const { applyMask } = require('morphjs')
const moment = require('moment')

let connections = {}
let uri = config.db

// Set connection URI
const setConnectionURL = (u) => {
  uri = u
}

// Fetch connection URI
const getConnectionURL = () => {
  return uri
}

// Create a Mongo connection
const getConnection = async () => {
  const { host, db } = getConnectionURL()

  const u = `${host}/${db}`
  if (!connections[u]) {
    const c = await MongoClient.connect(host)
    connections[u] = c.db(db)
  }
  return connections[u]
}

const hasCollection = async (collection) => {
  const connection = await getConnection()
  return connection.listCollections({ name: collection }).hasNext()
}

const listCollections = async () => {
  const connection = await getConnection()
  const collections = await connection.listCollections().toArray()
  return collections.map(c => c.name)
}

// Fetch a connection for a collection
const getCollection = async (collection) => {
  const connection = await getConnection()
  return connection.collection(collection)
}

const getEmptyCollection = async (collection) => {
  const c = await getCollection(collection)
  await c.remove()
  return c
}

// Helper to make safe ObjectIDs when receiving from the wild
const safeId = (id) => {
  try {
    return id
      ? ObjectId(id)
      : undefined
  } catch (e) {}
}

// Returns current timestamp
const getTimestamp = () => moment().format()

const removeCollection = async (name) => {
  const c = await getCollection(name)
  return c.remove()
}
exports.removeCollection = removeCollection
exports.listCollections = listCollections

exports.getEmptyCollection = getEmptyCollection
exports.hasCollection = hasCollection
exports.getTimestamp = getTimestamp
exports.applyMask = applyMask
exports.getConnectionURL = getConnectionURL
exports.setConnectionURL = setConnectionURL
exports.getConnection = getConnection
exports.getCollection = getCollection
exports.safeId = safeId
