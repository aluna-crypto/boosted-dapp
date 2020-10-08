const SELECTED_ENV = process.env.ENV || 'development'

const ENVIROMENTS = {}

ENVIROMENTS.development = {
  ENV: 'development',
  ETHEREUM_CHAIN_ID: '33'
}

ENVIROMENTS.staging = {
  ENV: 'staging',
  ETHEREUM_CHAIN_ID: '42'
}

ENVIROMENTS.production = {
  ENV: 'production',
  ETHEREUM_CHAIN_ID: '1'
}

module.exports.env = ENVIROMENTS[SELECTED_ENV]