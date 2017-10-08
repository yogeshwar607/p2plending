'use strict'

const loanProposalDao = require('../model/loanProposalDao')
const lendProposalDao = require('../model/lendProposalDao')
const uuidv4 = require('uuid/v4')
const Promise = require('bluebird')
const constants = require('../utils/constants')
const _ = require('lodash')

const createProposal = (loanProposal) => {
  //generate proposal id
  loanProposal.proposalId = uuidv4()
  loanProposal.status = constants.PROPOSAL_STATUS.OPEN

  return loanProposalDao.saveProposal(loanProposal)
}

const getProposal = (proposalId) => {
  return loanProposalDao.getLoanProposalFromProposalId(proposalId)
}

const getProposals = (userId) => {
  return loanProposalDao.getLoanProposalsFromUserId(userId)
}

const getMatchedProposals = (userId) => {
  let lendProposal = {}
  const matchedProposals = []
  return lendProposalDao.getlendProposalsFromUserId(userId)
    .then((proposal) => {
      if (!proposal) {
        return Promise.reject(new Error('Please add lending criteria first to start'))
      }

      lendProposal = proposal
      return loanProposalDao.getAllProposals()
    })
    .then((allProposals) => {
      _.forEach(allProposals, (proposal) => {
        if (proposal.status === constants.PROPOSAL_STATUS.OPEN && proposal.borrowerUserId !== userId && proposal.amount <= lendProposal.amount && proposal.maxROI >= lendProposal.minROI && proposal.duration <= lendProposal.duration) {
          matchedProposals.push(proposal)
        } else if (proposal.lenderDetails && proposal.lenderDetails.lenderUserId === userId) {
          matchedProposals.push(proposal)
        }
      })
      if (matchedProposals.length <= 0) {
        return Promise.reject(new Error('No matching proposal found, Please try again'))
      }

      return Promise.resolve(matchedProposals)
    })
}

const acceptProposal = (userId, proposalId) => {
  let lendProposal = {}
  return lendProposalDao.getlendProposalsFromUserId(userId)
    .then((proposal) => {
      lendProposal = proposal
      return loanProposalDao.getLoanProposalFromProposalId(proposalId)
    })
    .then((proposal) => {
      proposal.lenderDetails = {
        lenderUserId: userId,
        amount: proposal.amount,
        duration: proposal.duration,
        acceptedAt: Date.now(),
        ROI: lendProposal.minROI
      }
      proposal.status = constants.PROPOSAL_STATUS.ACCEPTED
      return loanProposalDao.updateLoanProposal(proposal)
    })
}

module.exports = {
  createProposal,
  getProposal,
  getProposals,
  getMatchedProposals,
  acceptProposal
}