const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const userScheme = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// signup method to create a new user
userScheme.statics.signup = async function(fname, lname, email, password) {
  // validation
  if (!fname || !lname || !email || !password) {
    throw Error('All fields must be filled')
  }
  const exists = await this.findOne({email})
  if (exists) {
    throw Error('Email already in use')
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({fname, lname, email, password: hash})
  return user
}

module.exports = mongoose.model('User', userScheme)