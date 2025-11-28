const express = require('express')
const {
  createAccount,
  loginUser
} = require('../controllers/userController')

const router = express.Router()

// get a single user
router.post('/login', loginUser)

// create an account
router.post('/createUser', createAccount)

module.exports = router