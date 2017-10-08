'use strict'
const Promise = require('bluebird')
const cleanDeep = require('clean-deep')
const _ = require('lodash')

const loanProposalSchema = require('../model/schema/loanProposalSchema')

const saveProposal = (loanProposal) => {
  loanProposal.createdAt = Date.now()
  loanProposal.updatedAt = Date.now()
  const loanObj = new loanProposalSchema(loanProposal)

  return new Promise((resolve, reject) => {
    loanObj.save((err)=>{
      if(err){
        return reject(err)
      }
      return resolve(loanProposal)
    })
  })
}

const getLoanProposalFromProposalId = (proposalId) => {
  return new Promise((resolve, reject) => {
    loanProposalSchema.findOne({proposalId:proposalId},(err, data)=>{
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

const getLoanProposalsFromUserId = (userId) => {
  return new Promise((resolve, reject) => {
    loanProposalSchema.find({borrowerUserId:userId},(err, data)=>{
      if(err){
        return reject(err)
      }

      if(data) {
        const dataArr = []
        _.forEach(data, (item) => {
          dataArr.push(item._doc)
        })
        return resolve(dataArr)
      }else {
        return resolve(null)
      }
    })
  })
}

const updateLoanProposal = (loanProposal) => {
  loanProposal = cleanDeep(loanProposal)
  const options = {upsert: true}
  return new Promise((resolve, reject) => {
    loanProposalSchema.update({proposalId: loanProposal.proposalId}, loanProposal, options, (err)=>{
      if(err){
        return reject(err)
      }
      return resolve(loanProposal)
    })
  })
}

const getAllProposals = () => {
  return new Promise((resolve, reject) => {
    loanProposalSchema.find({},(err, data)=>{
      if(err){
        return reject(err)
      }

      if(data) {
        let dataArr = []
        _.forEach(data, (item) => {
           dataArr.push(item._doc)
        })
        return resolve(dataArr)
      }else {
        return resolve(null)
      }
    })
  })
}

module.exports = {
  saveProposal,
  getLoanProposalFromProposalId,
  getLoanProposalsFromUserId,
  updateLoanProposal,
  getAllProposals
}
