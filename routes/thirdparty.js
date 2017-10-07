const express = require('express')
const router = express.Router()

router.post('/signzy/callback', function(req, res, next) {
  console.log('callback recieved from signzy' +  req.body)
  res.json({
    success:true
  })
})

module.exports = router
