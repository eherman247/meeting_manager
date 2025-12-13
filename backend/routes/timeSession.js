const express = require('express')
const {
  createTimeSession,
  getTimeSession,
  getTimeSessions,
  deleteTimeSession,
} = require('../controllers/timeSessionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// get all timesessions
router.get('/', requireAuth, getTimeSessions)

// get a single timesession
router.get('/:id', getTimeSession)

// post a timesession
router.post('/', requireAuth, createTimeSession)

// delete a timesession
router.delete('/:id', requireAuth, deleteTimeSession)

module.exports = router