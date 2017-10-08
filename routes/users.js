const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const loanProposalController = require('../controller/loanProposalController')
const lendProposalController = require('../controller/lendProposalController')
const logger = require('../utils/logger')
const fs = require('fs-extra')
const multer = require('multer')
const upload = multer({ dest: '/tmp/' })
const signzy = require('../thirdpartyapis/signzy')

router.post('/signup', function(req, res, next) {
  const user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password
  }

  return userController.createUser(user)
    .then((data) => {
      logger.info(user.userId, 'successfully signed up')
      res.json({
        success:true,
        message:'successfully signed up',
        userId: data.userId
      })
    })
    .catch((e) => {
      logger.err(user.userId, 'error while signing up', e)
      res.json({
        success:false,
        message:'error while signing up'
      })
    })
})

router.post('/signin', function(req, res, next) {
  const username = req.body.username
  const password = req.body.password

  return userController.loginUser(username, password)
    .then((data) => {
      logger.info(username, 'successfully signed in' + JSON.stringify(data))
      res.json({
        success:true,
        message:'successfully signed in',
        userId: data.userId
      })
    })
    .catch((e) => {
      logger.err(username, 'error while signing in', e)
      res.json({
        success:false,
        message:'error while signing in'
      })
    })
})

router.get('/', function(req, res, next) {
  const userId = req.query.userId

  return userController.getUser(userId)
    .then((data) => {
      logger.info(userId, 'successfully got user from userId')
      res.json({
        success:true,
        user: data
      })
    })
    .catch((e) => {
      logger.err(userId, 'error while getting user', e)
      res.json({
        success:false,
        message: e.message
      })
    })
})

router.post('/doc/upload', upload.any(), function(req, res, next) {
  const type = req.body.type
  const userId = req.body.userId
  const files = req.files[0]
  const fileName = type + '_' + userId + '.png'
  const filePath = './public/images/'+ fileName
  fs.rename(files.path, filePath, function(e) {
    if (e) {
      logger.err(userId, 'error while uploading ' + type, e)
      return res.json({
        success:false,
        message: e.message
      })
<<<<<<< Updated upstream
    }
=======
    })
})

router.get('/update-kyc', function(req, res, next) {
  const type = req.query.type
  const userId = req.query.userId
>>>>>>> Stashed changes

    //send image to signzy
    signzy.createIdentity(userId, type, fileName)
    //update user object with status of document
    return res.json({
      success:true,
      message: type + ' uploaded successfully'
    })
  })
})

<<<<<<< Updated upstream
=======
router.post('/update', function(req, res, next) {
  const userId = req.query.userId
  const user = {
    userId: req.query.userId,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
    dob: req.body.dob
  }

  return userController.updateUser(user, userId)
    .then((user) => {
      logger.info(userId, 'successfully uploaded')
      res.json({
        success:true,
        user: user
      })
    })
    .catch((e) => {
      logger.err(userId, 'error while uploading', e)
      res.json({
        success:false,
        message: e.message
      })
    })
})

router.get('/me/loan-proposals', function(req, res, next) {
  const userId = req.query.userId || req.body.userId

  return loanProposalController.getProposals(userId)
    .then((data) => {
      logger.info(userId, 'successfully returned proposals')
      res.json({
        success:true,
        message:'successfully retuned proposals',
        proposals: data
      })
    })
    .catch((e) => {
      logger.err(userId, 'error while getting proposals', e)
      res.json({
        success:false,
        message:'error while getting proposals'
      })
    })
})

router.get('/loan-proposals', function(req, res, next) {
  const userId = req.query.userId || req.body.userId

  return loanProposalController.getMatchedProposals(userId)
    .then((data) => {
      logger.info(userId, 'successfully returned matched proposals')
      res.json({
        success:true,
        message:'successfully retuned matched proposals',
        proposals: data
      })
    })
    .catch((e) => {
      logger.err(userId, 'error while getting matched proposals', e)
      res.json({
        success:false,
        message:'error while getting matched proposals'
      })
    })
})

router.get('/me/lend-proposals', function(req, res, next) {
  const userId = req.query.userId || req.body.userId

  return lendProposalController.getProposalFromUserId(userId)
    .then((data) => {
      logger.info(userId, 'successfully returned proposals')
      res.json({
        success:true,
        message:'successfully retuned proposals',
        proposals: data
      })
    })
    .catch((e) => {
      logger.err(userId, 'error while getting proposals', e)
      res.json({
        success:false,
        message:'error while getting proposals'
      })
    })
})

>>>>>>> Stashed changes
module.exports = router
