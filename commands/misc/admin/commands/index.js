const opencnftUpdateRunner = require('./opencnft-update')

const ALL_SUB_COMMANDS = [
  {
    name: "opencnft",
    description: 'Ping!',
    usage: 'put usage here',
    execute: opencnftUpdateRunner
  }
]

module.exports = ALL_SUB_COMMANDS