const TimeSession = require('../models/timeSessionModel')
const mongoose = require('mongoose')

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
  const {title, sessionCode, ownerId} = req.body

  try {
    const timeSession = await TimeSession.create({title, sessionCode, ownerId})
    res.status(200).json(timeSession)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

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