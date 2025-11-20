import { useState } from "react"
import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { timeToMin } from "../utils/timeConvert"


const TimeOffForm = () => {
  const {dispatch} = useTimeOffContext()

  const [name, setName] = useState('')  
  const [day, setDay] = useState('')  
  const [timeStart, setTimeStart] = useState('00:00')  
  const [timeEnd, setTimeEnd] = useState('00:01')  
  const [error, setError] = useState(null)  
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    // converting time to integers for backend
    const startMin = timeToMin(timeStart)
    const endMin = timeToMin(timeEnd)

    // data to be sent to backend
    const time = {name:name, day:day, timeStart:startMin, timeEnd:endMin}   

    const response = await fetch('/times', {
      method: 'POST',
      body: JSON.stringify(time),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    
    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok){
      setName('')
      setDay('')
      setTimeStart('00:00')
      setTimeEnd('00:01')
      setError(null)
      dispatch({type: 'CREATE_TIMEOFF', payload: json})
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a new time constraint</h3>

      <label>Name: </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />

      <label for="weekdays">Day of the week: </label>
      <select name="days" id="weekdays" onChange={(e) => setDay(e.target.value)} value={day} required>
        <option value=""></option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

      <label>Start Time: </label>
      <input
        type="time"
        step="60"
        onChange={(e) => setTimeStart(e.target.value)}
        value={timeStart}
        required
      />

      <label>End Time: </label>
      <input
        type="time"
        step="60"
        onChange={(e) => setTimeEnd(e.target.value)}
        value={timeEnd}
        required
      />

      <button>Add Time</button>
      {error && <div className="error">{error}</div>}
    </form>

  )
}

export default TimeOffForm