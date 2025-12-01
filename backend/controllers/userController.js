const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

// get a single user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// create a new user
const createAccount = async (req, res) => {
  const {fname, lname, email, password} = req.body
  try {
    const user = await User.signup(fname, lname, email, password)

    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  createAccount,
  loginUser
}
