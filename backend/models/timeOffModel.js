const mongoose = require('mongoose')

const Schema = mongoose.Schema

const timeOffScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  timeStart: {
    type: Number,
    required: true
  },
  timeEnd:{
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('TimeOff', timeOffScheme)
