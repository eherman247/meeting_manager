const express = require('express')
const {
  createTimeSession,
  getTimeSession,
  deleteTimeSession,
} = require('../controllers/timeSessionController')

const router = express.Router()


// get a single time
router.get('/:id', getTimeSession)

// post a time
router.post('/', createTimeSession)

// delete a time
router.delete('/:id', deleteTimeSession)

module.exports = router