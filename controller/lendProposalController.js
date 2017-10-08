'use strict'

const lendProposalDao = require('../model/lendProposalDao')
const uuidv4 = require('uuid/v4')
const Promise = require('bluebird')
const constants = require('../utils/constants')

const createProposal = (lendProposal) => {
  //generate proposal id
  lendProposal.proposalId = uuidv4()
  return lendProposalDao.saveProposal(lendProposal)
}

const getProposal = (proposalId) => {
  return lendProposalDao.getlendProposalFromProposalId(proposalId)
}

const getProposalFromUserId = (userId) => {
  return lendProposalDao.getlendProposalsFromUserId(userId)
}

module.exports = {
  createProposal,
  getProposal,
  getProposalFromUserId
}