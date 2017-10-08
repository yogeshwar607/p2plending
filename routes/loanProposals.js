const express = require('express')
const router = express.Router()
const loanProposalController = require('../controller/loanProposalController')
const logger = require('../utils/logger')
const multer = require('multer')
const upload = multer({ dest: '/tmp/' })

router.post('/create', function(req, res, next) {
  const userId = req.query.userId || req.body.userId
  const loanProposal = {
    borrowerUserId: userId,
    maxROI: req.body.maxROI,
    amount: req.body.amount,
    duration: req.body.duration,
    reason: req.body.reason
  }

  return loanProposalController.createProposal(loanProposal)
    .then((data) => {
      logger.info(userId, 'successfully created proposal')
      res.json({
        success:true,
        message:'successfully created proposal',
        userId: data.proposalId
      })
    })
    .catch((e) => {
      logger.err(userId, 'error while creating proposal', e)
      res.json({
        success:false,
        message:'error while creating proposal'
      })
    })
})

router.get('/', function(req, res, next) {
  const userId = req.query.userId || req.body.userId
  const proposalId = req.query.proposalId || req.body.proposalId

  return loanProposalController.getProposal(userId, proposalId)
    .then((data) => {
      logger.info(userId, 'successfully returned proposal')
      res.json({
        success:true,
        message:'successfully retuned proposal',
        userId: data.proposalId
      })
    })
    .catch((e) => {
      logger.err(userId, 'error while getting proposal', e)
      res.json({
        success:false,
        message:'error while getting proposal'
      })
    })
})

router.get('/accept', function(req, res, next) {
  const userId = req.query.userId || req.body.userId
  const proposalId = req.query.proposalId || req.body.proposalId

  return loanProposalController.acceptProposal(userId, proposalId)
    .then((data) => {
      logger.info(userId, 'successfully returned proposal')
      res.json({
        success:true,
        message:'successfully retuned proposal',
        userId: data.proposalId
      })
    })
    .catch((e) => {
      logger.err(userId, 'error while getting proposal', e)
      res.json({
        success:false,
        message:'error while getting proposal'
      })
    })
})

module.exports = router
