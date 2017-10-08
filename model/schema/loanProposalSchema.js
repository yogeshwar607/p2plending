'use strict'
const mongoose = require('mongoose')
const Connection = require('../../db/connection')
const Schema = mongoose.Schema

const loanProposalSchema = new Schema({
  proposalId: String,
  borrowerUserId: String,
  maxROI: Number,
  amount: Number,
  duration: Number,
  reason: String,
  createdAt: Number,
  updatedAt: Number,
  status: String,
  paidStatus: String,
  lenderDetails: {
    lenderUserId: String,
    amount: Number,
    duration: Number,
    ROI: Number,
    acceptedAt: Number
  }
})

module.exports = Connection.connection.model('loan_proposals', loanProposalSchema)
