const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const logger = require('../utils/logger')

router.post('/signzy/callback', function(req, res, next) {
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

module.exports = router
