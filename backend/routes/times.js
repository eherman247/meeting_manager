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

// require auth for all time off routes
router.use(requireAuth)

// get all times
router.get('/', getTimeOffs)

// get a single time
router.get('/:id', getTimeOff)

// post a time
router.post('/', createTimeOff)

// delete a time
router.delete('/:id', deleteTimeOff)

// update a time
router.patch('/:id', updateTimeOff)

module.exports = router