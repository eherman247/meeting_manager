const TimeSession = require('../models/timeSessionModel')
const mongoose = require('mongoose')

// get all time sessions
const getTimeSessions = async (req, res) => {
  const user_id = req.user._id;
  const timeSessions =  await TimeSession.find({user_id}).sort({_id: -1})
  res.status(200).json(timeSessions)
}

// get a single time session
const getTimeSession = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such time session data'})
  }
  const timeSession = await TimeSession.findById(id)

  if(!timeSession){
    return res.status(404).json({error: 'No such time session data'})
  }

  res.status(200).json(timeSession)
}
// create a new time session
const createTimeSession = async (req, res) => {
  const {title, password} = req.body
  const user_id = req.user._id;

  try {
    const timeSession = await TimeSession.create({title, password, user_id})
    res.status(200).json(timeSession)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  res.json({mssg: 'POST a new time session'})

}

// delete a time session
const deleteTimeSession = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such time session data'})
  }
  const timeSession = await TimeSession.findOneAndDelete({_id: id})

  if(!timeSession){
    return res.status(400).json({error: 'No such time session data'})
  }
  res.status(200).json(timeSession)
}

module.exports = {
  createTimeSession,
  getTimeSession,
  getTimeSessions,
  deleteTimeSession,
}