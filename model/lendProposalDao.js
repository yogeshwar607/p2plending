'use strict'
const Promise = require('bluebird')
const cleanDeep = require('clean-deep')

const lendProposalSchema = require('../model/schema/lendProposalSchema')

const saveProposal = (lendProposal) => {
  const lendObj = new lendProposalSchema(lendProposal)

  return new Promise((resolve, reject) => {
    lendObj.save((err)=>{
      if(err){
        return reject(err)
      }
      return resolve(lendObj)
    })
  })
}

const getlendProposalFromProposalId = (proposalId) => {
  return new Promise((resolve, reject) => {
    lendProposalSchema.findOne({proposalId:proposalId},(err, data)=>{
      if(err){
        return reject(err)
      }

      if(data && data._doc) {
        return resolve(data._doc)
      }else {
        return resolve(null)
      }
    })
  })
}

const getlendProposalsFromUserId = (userId) => {
  return new Promise((resolve, reject) => {
    lendProposalSchema.findOne({lenderUserId:userId},(err, data)=>{
      if(err){
        return reject(err)
      }

      if(data && data._doc) {
        return resolve(data._doc)
      }else {
        return resolve(null)
      }
    })
  })
}

const updatelendProposal = (lendProposal) => {
  lendProposal = cleanDeep(lendProposal)
  const options = {upsert: true}
  return new Promise((resolve, reject) => {
    lendProposalSchema.update({proposalId: lendProposal.proposalId}, user, options, (err)=>{
      if(err){
        return reject(err)
      }
      return resolve(user)
    })
  })
}


module.exports = {
  saveProposal,
  getlendProposalFromProposalId,
  getlendProposalsFromUserId,
  updatelendProposal
}
