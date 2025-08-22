import { useState } from "react"
import { useTimeOffContext } from "../hooks/useTimeOffsContext"


const TimeOffForm = () => {
  const {dispatch} = useTimeOffContext()

  const [day, setDay] = useState('')  
  const [timeStart, setTimeStart] = useState('')  
  const [timeEnd, setTimeEnd] = useState('')  
  const [error, setError] = useState(null)  
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const time = {day, timeStart, timeEnd}

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
      setDay('')
      setTimeStart('')
      setTimeEnd('')
      setError(null)
      console.log('new time added', json)
      dispatch({type: 'CREATE_TIMEOFF', payload: json})
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a new time constraint</h3>

      <label>Day: </label>
      <input
        type="text"
        onChange={(e) => setDay(e.target.value)}
        value={day}
      />

      <label>Start Time: </label>
      <input
        type="number"
        onChange={(e) => setTimeStart(e.target.value)}
        value={timeStart}
      />

      <label>End Time: </label>
      <input
        type="number"
        onChange={(e) => setTimeEnd(e.target.value)}
        value={timeEnd}
      />

      <button>Add Time</button>
      {error && <div className="error">{error}</div>}
    </form>

  )
}

export default TimeOffForm