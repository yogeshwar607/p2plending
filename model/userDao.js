'use strict'
const Promise = require('bluebird')

const userSchema = require('../model/schema/userSchema')

const saveUser = (user) => {
  const userObj = new userSchema(user)
  
  return new Promise((resolve, reject) => {
    userObj.save((err)=>{
      if(err){
        return reject(err)
      }
      return resolve(user)
    })
  })
}

const getUserFromUsername = (username) => {
  return new Promise((resolve, reject) => {
    userSchema.findOne({username:username},(err, data)=>{
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

const getUserFromUserId = (userId) => {
  return new Promise((resolve, reject) => {
    userSchema.findOne({userId:userId},(err, data)=>{
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

const updateUser = (user) => {
  const options = {upsert: true}
  return new Promise((resolve, reject) => {
    userSchema.update({userId: user.userId}, user, options, (err)=>{
      if(err){
        return reject(err)
      }
      return resolve(user)
    })
  })
}


module.exports = {
  saveUser,
  getUserFromUsername,
  getUserFromUserId,
  updateUser
}
