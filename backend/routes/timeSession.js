const express = require('express')
const {
  createTimeSession,
  getTimeSession,
  getTimeSessions,
  deleteTimeSession,
} = require('../controllers/timeSessionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all time session routes
router.use(requireAuth)

// get all times
router.get('/', getTimeSessions)

// get a single time
router.get('/:id', getTimeSession)

// post a time
router.post('/', createTimeSession)

// delete a time
router.delete('/:id', deleteTimeSession)

module.exports = router