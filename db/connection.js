'use strict'

const mongoose = require('mongoose')

const logger = require('../utils/logger')
const constants = require('../utils/constants')

const host = constants.MONGO_HOST_URL

const socketOptions = {
  socketOptions: {
    keepAlive: 30000, // represents the number of ms the connection needs to timeout until a new connection is made
    connectTimeoutMS: 30000, // maximum amount of time driver will wait for a connection to be established with the server
    socketTimeoutMS: 60000, // how long to wait for responses from the server
    reconnectTries: Number.MAX_VALUE, // number of times mongoose will try to reconnect
    reconnectInterval: 5000 // Server will wait 5000 milliseconds between retries
  }
}

/*
 Mongoose can take both a connection string and a separate `user`
 and `pass` in options. Both work, but setting explicit user and
 pass overrides the ones in the URI.
 */
const mongoOptions = {
  promiseLibrary: require('bluebird'),
  user: constants.MONGO_USER,
  pass: constants.MONGO_PWD
}
const connection = mongoose.createConnection(host, mongoOptions)

connection.on('error', err => {
  logger.err(null, 'Mongoose failed to connect to the DB.', err)
})

connection.on('open', () => {
  logger.info(null, 'Mongoose has connected to the DB.')
})

connection.on('close', str => {
  logger.info(null, `Mongoose has disconnected from the db: ${str}.`)
})

module.exports = {
  connection
}
