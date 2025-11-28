const User = require('../models/userModel')
const mongoose = require('mongoose')


// get a single user
const loginUser = async (req, res) => {
  res.json({mssg: 'Login user'})
  // const {id} = req.params
  // if(!mongoose.Types.ObjectId.isValid(id)){
  //   return res.status(404).json({error: 'No such user'})
  // }
  // const user = await User.findById(id)
  // if(!user){
  //   return res.status(404).json({error: 'No such user'})
  // }
  // res.status(200).json(user)
}

// create a new user
const createAccount = async (req, res) => {
  const {fname, lname, email, password} = req.body
  try {
    const user = await User.signup(fname, lname, email, password)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  createAccount,
  loginUser
}
