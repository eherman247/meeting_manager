const mongoose = require('mongoose')

const Schema = mongoose.Schema

const timeOffScheme = new Schema({
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
  }
})

module.exports = mongoose.model('TimeOff', timeOffScheme)
