'use strict'
const mongoose = require('mongoose')
const Connection = require('../../db/connection')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userId: String,
  name: String,
  username: String,
  email: String,
  mobile: Number,
  password: String,
  aadhaarNo: String,
  aadhaarStatus: String,
  aadhaarImagePath: String,
  panNo: String,
  panStatus: String,
  panImagePath: String,
  licenseNo: String,
  licenseStatus: String,
  licenseImagePath: String,
  dob: String,
  rating: Number,
  isVerified: Boolean
})

module.exports = Connection.connection.model('user', userSchema)
