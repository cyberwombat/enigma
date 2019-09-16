const fs = require('fs')
const listFiles = async path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) return resolve(err)
      resolve(files)
    })
  })
}

const readFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) return resolve(err)
      resolve(data)
    })
  })
}

const createFile = async (data, path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) return resolve(err)
      resolve()
    })
  })
}
exports.createFile = createFile
exports.readFile = readFile
exports.listFiles = listFiles
