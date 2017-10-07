'use strict'

const userDao = require('../model/userDao')
const uuidv4 = require('uuid/v4')
const Promise = require('bluebird')
const md5 = require('md5')

const createUser = (user) => {
  //generate user id
  user.userId = uuidv4()
  //md5 password
  user.password = md5(user.password)
  return userDao.saveUser(user)
}

const loginUser = (username, password) => {
  const encryptedPassword = md5(password)
  return userDao.getUserFromUsername(username)
    .then((user) => {
      if (user && user.password === encryptedPassword) {
        return Promise.resolve(user)
      } else {
        return Promise.reject(new Error('Invalid username or password'))
      }
    })
}

const getUser = (userId) => {
  return userDao.getUserFromUserId(userId)
    .then((user) => {
      if (user) {
        return Promise.resolve(user)
      } else {
        return Promise.reject(new Error('Invalid userId'))
      }
    })
}

module.exports = {
  createUser,
  loginUser,
  getUser
}