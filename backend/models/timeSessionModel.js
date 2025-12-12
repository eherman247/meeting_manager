const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeSessionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('TimeSession', timeSessionSchema)