'use strict'

const request = require('request')
const constants = require('../utils/constants')

const autoRead = (itemId) => {
  const options = { method: 'POST',
    url: constants.SIGNZY_VERIFICATION_URL,
    headers:
      { accept: '*/*',
        'content-type': 'application/json',
        'accept-language': 'en-US,enq=0.8' },
    body:
      { service: 'Identity',
        itemId: itemId,
        accessToken: constants.SIGNZY_ACCESS_TOKEN,
        task: 'autoRecognition',
        essentials: {} },
    json: true }

  request(options, function (error, response, body) {
    if (error) {
      console.log(error)
      return reject(error)
    }

    console.log(body)
    return resolve(body)
  })
}

const verifyAdhaar = (adhaarNo, yob, itemId) => {
  const options = {
    method: 'POST',
    url: constants.SIGNZY_VERIFICATION_URL,
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'accept-language': 'en-US,enq=0.8'
    },
    body: {
      service: 'Identity',
      itemId: itemId,
      accessToken: constants.SIGNZY_ACCESS_TOKEN,
      task: 'verification',
      essentials: {
        uid: adhaarNo,
        yob: yob
      }
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) {
      console.log(error)
      return reject(error)
    }

    console.log(body)
    return resolve(body)
  })
}

const createIdentity = (userId, type, imageURL) => {
  const options = { method: 'POST',
    url: constants.SIGNZY_IDENTITY_URL,
    headers:
      { authorization: constants.SIGNZY_ACCESS_TOKEN,
        accept: '*/*',
        'content-type': 'application/json',
        'accept-language': 'en-US,enq=0.8' },
    body:
      { type: 'individualPan',
        callbackUrl: constants.SIGNZY_CALLBAK_URL,
        email: 'thewarlocksom@gmail.com',
        images: [ constants.HOST + '/' + imageURL ] },
    json: true }


    if (type === 'pan') {
      options.body.type = 'individualPan'
    } else if (type === 'aadhaar') {
      options.body.type = 'aadhaar'
    } else if (type === 'license') {
      options.body.type = 'drivingLicence'
    }

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        console.log(error)
        return reject(error)
      }

      console.log(body)
      return resolve(body)
    })
  })
}

module.exports = {
  verifyAdhaar,
  createIdentity,
  autoRead
}