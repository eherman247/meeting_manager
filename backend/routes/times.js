const express = require('express')
const {
  createTimeOff,
  getTimeOffs,
  getTimeOff,
  deleteTimeOff,
  updateTimeOff
} = require('../controllers/timeOffController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()



// get all times
router.get('/', getTimeOffs)

// get a single time
router.get('/:id', getTimeOff)

// post a time
router.post('/', requireAuth, createTimeOff)

// delete a time
router.delete('/:id', requireAuth, deleteTimeOff)

// update a time
router.patch('/:id', requireAuth, updateTimeOff)

module.exports = router