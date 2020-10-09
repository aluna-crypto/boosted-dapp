const CURRENT_ENV = process.env.ENV || 'development'

module.exports.env = require(`./.env.${CURRENT_ENV}.js`)