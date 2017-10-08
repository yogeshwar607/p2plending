const express = require('express')
const router = express.Router()
const lendProposalController = require('../controller/lendProposalController')
const logger = require('../utils/logger')

router.post('/create', function(req, res, next) {
  const userId = req.query.userId || req.body.userId
  const lendProposal = {
    lenderUserId: userId,
    minROI: req.body.minROI,
    amount: req.body.amount,
    duration: req.body.duration,
    comment: req.body.comment
  }

  return lendProposalController.createProposal(lendProposal)
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

  return lendProposalController.getProposal(userId, proposalId)
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
