'use strict'
const Promise = require('bluebird')

const userSchema = require('../model/schema/userSchema')

const saveUser = (user) => {
  const userObj = new userSchema(user)
  
  return new Promise((resolve, reject) => {
    userObj.save((err)=>{
      if(err){
        reject(err)
      }
      resolve(user)
    })
  })
}

const getUserFromUsername = (username) => {
  return new Promise((resolve, reject) => {
    userSchema.findOne({username:username},(err, data)=>{
      if(err){
        reject(err)
      }

      if(data && data._doc) {
        resolve(data._doc)
      }else {
        resolve(null)
      }
    })
  })
}

const getUserFromUserId = (userId) => {
  return new Promise((resolve, reject) => {
    userSchema.findOne({userId:userId},(err, data)=>{
      if(err){
        reject(err)
      }

      if(data && data._doc) {
        resolve(data._doc)
      }else {
        resolve(null)
      }
    })
  })
}

module.exports = {
  saveUser,
  getUserFromUsername,
  getUserFromUserId
}
