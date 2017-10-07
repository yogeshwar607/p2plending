'use strict'

const userDao = require('../model/userDao')
const uuidv4 = require('uuid/v4')
const Promise = require('bluebird')
const md5 = require('md5')
const signzy = require('../thirdpartyapis/signzy')
const fs = require('fs-extra')
const constants = require('../utils/constants')
const ratingUtil = require('../utils/ratingUtil')

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

const docUpload = (files, type, userId, fileName, filePath) => {
  return new Promise((resolve, reject) => {
    fs.rename(files.path, filePath, function(e) {
      if (e) {
        logger.err(userId, 'error while uploading ' + type, e)
        return reject(e)
      }

      const imageURL = constants.HOST + '/images/' + fileName
      let docData = {}

      //send image to signzy
      return signzy.createIdentity(userId, type, imageURL)
        .then((data) => {
          docData = data
          //update user object with status of document
          return userDao.getUserFromUserId(userId)
        })
        .then((user) => {
          if (type === 'pan') {
            user.panStatus = constants.STATUS.PENDING
            user.panNo = docData.panNo
            user.panImagePath = imageURL
          } else if (type === 'aadhaar') {
            user.aadhaarStatus = constants.STATUS.PENDING
            user.aadhaarNo = docData.aadhaarNo
            user.aadhaarImagePath = imageURL
          } else if (type === 'license') {
            user.licenseStatus = constants.STATUS.PENDING
            user.licenseNo = docData.licenseNo
            user.licenseImagePath = imageURL
          } else {
            user.aadhaarStatus = constants.STATUS.PENDING
            user.aadhaarNo = docData.aadhaarNo
            user.aadhaarImagePath = imageURL
          }

          user.isVerified = false
          user.rating = 0
          return userDao.updateUser(user)
        })
        .then((user) => {
          console.log(user)
          return resolve(user)
        })
        .catch((e) => {
          console.log(e)
          return reject(e)
        })
    })
  })
}

const updateKyc = (type, userId) => {
  return userDao.getUserFromUserId(userId)
    .then((user) => {
      if (type === 'pan') {
        user.panStatus = constants.STATUS.Verified
      } else if (type === 'aadhaar') {
        user.aadhaarStatus = constants.STATUS.Verified
      } else if (type === 'license') {
        user.licenseStatus = constants.STATUS.Verified
      }
      user = ratingUtil.getUserRating(user)
      return userDao.updateUser(user)
    })
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  docUpload,
  updateKyc
}