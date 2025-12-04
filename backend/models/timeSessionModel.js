const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema

const timeSessionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  sessionCode: {
    type: Number,
    required: true,
    unique: true
  },
  ownerId: {
    type: String,
    required: true
  }
})

timeSessionSchema.plugin(AutoIncrement, {inc_field: 'sessionCode'});

module.exports = mongoose.model('TimeSession', timeSessionSchema)