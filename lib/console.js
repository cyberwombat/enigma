const prettyjson = require('prettyjson')
const toConsole = (data, exit = false) => {
  if (data instanceof Error) {
    data = data.message
    exit = true
  }
  console.log(prettyjson.render(data, {
    keysColor: 'magenta',
    dashColor: 'grey',
    stringColor: 'cyan'
  }))

  if (exit) process.exit(1)
}

exports.toConsole = toConsole
