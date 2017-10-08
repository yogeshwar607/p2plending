'use strict'
const constants = {}

constants.MONGO_HOST_URL = 'mongodb://ds111895.mlab.com:11895/p2plending'
constants.MONGO_USER = 'som1'
constants.MONGO_PWD = 'Som@123'
constants.SIGNZY_VERIFICATION_URL = 'https://preproduction.signzy.tech/api/v2/snoops'
constants.SIGNZY_IDENTITY_URL = 'https://preproduction.signzy.tech/api/v2/patrons/59b2b774e2c05333a656fb5d/identities'
constants.SIGNZY_ACCESS_TOKEN = 'DVhPIX5OxHbBbgsb7mlEhPfqNo2QV1lGPK9zG0H3g9lkvsFM58FLPIwXsDouY04F'
constants.HOST = 'https://981c952e.ngrok.io'
constants.SIGNZY_CALLBAK_URL = constants.HOST  + '/thirdparty/signzy/callback'

constants.AADHAAR_DETAILS = {
  aadhaarNo: "562534261133",
  dob: "01/09/1993",
  name: "Som Prabh Sharma"
}

constants.PAN_DETAILS = {
  panNo: "EGMPS8245D",
  name: "Som Prabh Sharma"
}

constants.LICENSE_DETAILS = {
  licenseNo: "RJ2220120001951",
  name: "Som Prabh Sharma"
}

constants.STATUS = {
  PENDING: 'Pending',
  Verified: 'Verified',
  NotVerified: 'Not Verified'
}

constants.PROPOSAL_STATUS = {
  OPEN: 'Open',
  COMPLETE: 'Complete',
  ACCEPTED: 'Accepted'
}

module.exports = constants
