exports.command = 'run'
exports.desc = 'Runs a trading stratgy'
exports.builder = (yargs) => yargs.commandDir('run').demandCommand()
exports.handler = (argv) => { }

