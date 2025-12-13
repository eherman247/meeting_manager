
import TimeOffForm from '../components/timeOffForm'
import TimeOffsDisplay from '../components/timeOffsDisplay'
import OverlapAvailDetails from '../components/overlapAvailDetails'
import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { useState, useEffect, useMemo } from 'react'

const TimeSession = () => {
  const [peopleFilter, setPeopleFilter] = useState([])
  const [timeFilter, setTimeFilter] = useState(0)
  
  const filter = {peopleFilter, timeFilter}

  // console.log("filters in time session", filter)

  const {timeOffs, dispatch} = useTimeOffContext()
  // console.log("timeOffs in time session", timeOffs)

  const uniqueNames = useMemo(() => {
    return [...new Set(timeOffs ? timeOffs.map((timeOff) => timeOff.name) : [])]
  }, [timeOffs])

  // console.log("unique names in time session", uniqueNames)

  useEffect(() => {
    const fetchTimeOffs = async () => {
      const currentTimeSession = JSON.parse(localStorage.getItem('currentTimeSession'))
      if (!currentTimeSession) {
        // No active session, perhaps dispatch an empty array or handle error
        dispatch({type: 'SET_TIMEOFF', payload: []})
        return
      }
      const response = await fetch(`/times?timeSession_id=${currentTimeSession._id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      if(response.ok) {
        dispatch({type: 'SET_TIMEOFF', payload: json})
      }
    }
    fetchTimeOffs()

  }, [dispatch])

  return (
    <div className="home">
      <h1>{localStorage.getItem('currentTimeSession') ? JSON.parse(localStorage.getItem('currentTimeSession')).title : ''}</h1>
      <h2>Session Code: {localStorage.getItem('currentTimeSession') ? JSON.parse(localStorage.getItem('currentTimeSession'))._id : ''}</h2>
      <TimeOffsDisplay timeOffs={timeOffs} />
      <TimeOffForm/>

      <h3>Filters:</h3>
      <h4>People Filter: </h4>
      {uniqueNames && uniqueNames.map((person) => (
        <><input key={person} type="checkbox" onChange={() => {
          setPeopleFilter((prev => {
            if (prev.includes(person)) {
              return prev.filter((p) => p !== person)
            } else {
              return [...prev, person]
            }
          }))
        }} checked={peopleFilter.includes(person)}/>{person}<br/></>
      ))} 
      <br/>
      <label>Minimum Overlap Time (minutes): </label>
      <input
        type="number"
        value={timeFilter}
        onChange={(e) => setTimeFilter(parseInt(e.target.value))}
        min="0"
      />
      <br/>
      <button onClick={() => {
        setPeopleFilter([])
        setTimeFilter(0)
      }}>Clear Filters</button>
      <OverlapAvailDetails timeOffs={timeOffs} filter={filter} uniqueNames={uniqueNames}/>
      <br/>
      <button onClick={() => {
        localStorage.removeItem('currentTimeSession')
        window.location.reload()
      }}>Leave Time Session</button>
    </div>
  ) 
}

export default TimeSession