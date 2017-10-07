'use strict'

const request = require('request')
const constants = require('../utils/constants')

const autoRead = (itemId, itemAccessToken) => {
  const options = { method: 'POST',
    url: constants.SIGNZY_VERIFICATION_URL,
    query: {
      'access_token': constants.SIGNZY_ACCESS_TOKEN
    },
    headers:
      { accept: '*/*',
        'content-type': 'application/json',
        'accept-language': 'en-US,enq=0.8' },
    body:
      { service: 'Identity',
        itemId: itemId,
        accessToken: itemAccessToken,
        task: 'autoRecognition',
        essentials: {} },
    json: true }

  return new Promise((resolve, reject) => {
    //since we are getting rate limit error from signzy, hence we are returning dummy data from here
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

const verifyAdhaar = (adhaarNo, yob, itemId, itemAccessToken) => {
  const options = {
    method: 'POST',
    url: constants.SIGNZY_VERIFICATION_URL,
    query: {
      'access_token': constants.SIGNZY_ACCESS_TOKEN
    },
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'accept-language': 'en-US,enq=0.8'
    },
    body: {
      service: 'Identity',
      itemId: itemId,
      accessToken: itemAccessToken,
      task: 'verification',
      essentials: {
        uid: adhaarNo,
        yob: yob
      }
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    //since we are getting rate limit error from signzy, hence we are returning dummy data from here
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

const verifyPan = (panNo, name, itemId, itemAccessToken) => {
  const options = {
    method: 'POST',
    url: constants.SIGNZY_VERIFICATION_URL,
    query: {
      'access_token': constants.SIGNZY_ACCESS_TOKEN
    },
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'accept-language': 'en-US,enq=0.8'
    },
    body: {
      service: 'Identity',
      itemId: itemId,
      accessToken: itemAccessToken,
      task: 'verification',
      essentials: {
        number: panNo,
        name: name
      }
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    //since we are getting rate limit error from signzy, hence we are returning dummy data from here
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

const verifyLicense = (licenseNo, issueDate, itemId, itemAccessToken) => {
  const options = {
    method: 'POST',
    url: constants.SIGNZY_VERIFICATION_URL,
    query: {
      'access_token': constants.SIGNZY_ACCESS_TOKEN
    },
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      'accept-language': 'en-US,enq=0.8'
    },
    body: {
      service: 'Identity',
      itemId: itemId,
      accessToken: itemAccessToken,
      task: 'verification',
      essentials: {
        number: panNo,
        issueDate: issueDate
      }
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    //since we are getting rate limit error from signzy, hence we are returning dummy data from here
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

const createIdentity = (userId, type, imageURL) => {
  const options = { method: 'POST',
    url: constants.SIGNZY_IDENTITY_URL,
    query: {
      'access_token': constants.SIGNZY_ACCESS_TOKEN
    },
    headers:
      { Authorization: constants.SIGNZY_ACCESS_TOKEN,
        accept: '*/*',
        'content-type': 'application/json',
        'accept-language': 'en-US,enq=0.8' },
    body:
      { type: 'individualPan',
        callbackUrl: constants.SIGNZY_CALLBAK_URL,
        email: 'thewarlocksom@gmail.com',
        images: [ imageURL ] },
    json: true }

  return new Promise((resolve, reject) => {
    //since we are getting rate limit error from signzy, hence we are returning dummy data from here
    if (type === 'pan') {
      options.body.type = 'individualPan'
      return resolve(constants.PAN_DETAILS)
    } else if (type === 'aadhaar') {
      options.body.type = 'aadhaar'
      return resolve(constants.AADHAAR_DETAILS)
    } else if (type === 'license') {
      options.body.type = 'drivingLicence'
      return resolve(constants.LICENSE_DETAILS)
    } else {
      return resolve(constants.AADHAAR_DETAILS)
    }
    /**request(options, function (error, response, body) {
      if (error) {
        console.log(error)
        return reject(error)
      }

      console.log(body)
      return resolve(body)
    })**/
  })
}

module.exports = {
  verifyAdhaar,
  createIdentity,
  autoRead,
  verifyPan,
  verifyLicense
}