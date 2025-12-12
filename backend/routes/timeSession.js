const express = require('express')
const {
  createTimeSession,
  getTimeSession,
  getTimeSessions,
  deleteTimeSession,
} = require('../controllers/timeSessionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// get all times
router.get('/', getTimeSessions)

// get a single time
router.get('/:id', getTimeSession)

// post a time
router.post('/', requireAuth, createTimeSession)

// delete a time
router.delete('/:id', requireAuth, deleteTimeSession)

module.exports = router