#!/usr/bin/env node
process.env.SUPPRESS_NO_CONFIG_WARNING = true

require('yargs')
  .commandDir('commands')
  .demandCommand()
  .help()
  .argv
