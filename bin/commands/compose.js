exports.command = 'compose'
exports.desc = 'Compose functions'
exports.builder = (yargs) => yargs.commandDir('compose').demandCommand()
exports.handler = (argv) => { }
