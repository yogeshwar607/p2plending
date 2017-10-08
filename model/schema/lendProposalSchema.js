'use strict'
const mongoose = require('mongoose')
const Connection = require('../../db/connection')
const Schema = mongoose.Schema

const lendProposalSchema = new Schema({
  proposalId: String,
  lenderUserId: String,
  minROI: Number,
  amount: Number,
  duration: Number,
  comment: String,
  createdAt: Number,
  updatedAt: Number,
})

module.exports = Connection.connection.model('lend_proposals', lendProposalSchema)
