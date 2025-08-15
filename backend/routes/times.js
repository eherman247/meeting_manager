const express = require('express')

const router = express.Router()

// get all times
router.get('/', (req, res) => {
  res.json({mssg: 'get times'})
})

// get a single time
router.get('/:id', (req, res) => {
  res.json({mssg: 'get a time'})
})

// post a time
router.post('/', (req, res) => {
  res.json({mssg: 'POST a new time'})
})

// delete a time
router.delete('/:id', (req, res) => {
  res.json({mssg: 'delete a time'})
})

// update a time
router.patch('/:id', (req, res) => {
  res.json({mssg: 'update a time'})
})

module.exports = router