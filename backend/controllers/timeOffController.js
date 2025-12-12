const TimeOff = require('../models/timeOffModel')
const mongoose = require('mongoose')

// get all times
const getTimeOffs = async (req, res) => {
  const { timeSession_id } = req.query

  if (!timeSession_id) {
    return res.status(400).json({error: 'timeSession_id is required'})
  }

  const timeOffs = await TimeOff.find({timeSession_id}).sort({day: -1})

  res.status(200).json(timeOffs)
}

// gat a single time
const getTimeOff = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such time data'})
  }

  const timeOff = await TimeOff.findById(id)

  if (!timeOff) {
    return res.status(404).json({error: "No such time data"})
  }

  res.status(200).json(timeOff)
}

// create a new time
const createTimeOff = async (req, res) => {
  const {name, day, timeStart, timeEnd, timeSession_id} = req.body
  const user_id = req.user._id


  try {
    const timeOff = await TimeOff.create({name, day, timeStart, timeEnd, user_id, timeSession_id})
    res.status(200).json(timeOff)
  }
  catch(error) {
    res.status(400).json({error: error.message})
  }
}

// delete a time
const deleteTimeOff = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such time data'})
  }

  const timeOff = await TimeOff.findOneAndDelete({_id: id})

  if (!timeOff) {
    return res.status(400).json({error: "No such time data"})
  }

  res.status(200).json(timeOff)

}

// update a time
const updateTimeOff = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such time data'})
  }

  const timeOff = await TimeOff.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!timeOff) {
    return res.status(400).json({error: "No such time data"})
  }

  res.status(200).json(timeOff)
}

module.exports = {
  createTimeOff,
  getTimeOffs,
  getTimeOff,
  deleteTimeOff,
  updateTimeOff
}