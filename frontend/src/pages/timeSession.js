import TimeOffForm from '../components/timeOffForm'
import TimeOffsDisplay from '../components/timeOffsDisplay'
import OverlapAvailDetails from '../components/overlapAvailDetails'
import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { useState, useEffect, useMemo } from 'react'

import { overlapTimes } from "../utils/overlapTimes"

const TimeSession = () => {
  const [peopleFilter, setPeopleFilter] = useState([])
  const [timeFilter, setTimeFilter] = useState(0)
  const [peopleWhoMatchUser, setPeopleWhoMatchUser] = useState([])
  const [user, setUser] = useState(null)
  
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

      <h3>Users:</h3>
      {uniqueNames && uniqueNames.map((person) => (
        <span key={person}>{person}, </span>
      ))}

      <h3>Find users who match:</h3>
      <h4>Select current user:</h4>
      {uniqueNames && uniqueNames.map((person) => (
        <><input key={person} type="radio" name="user" onChange={() => {
          setUser(person)
        }} checked={user === person}/>{person}<br/></>
      ))}
      <br/>
      <button onClick={() => {
        if (!user) return
        const userTimeOffs = timeOffs.filter((timeOff) => timeOff.name === user)
        setPeopleWhoMatchUser([])
        uniqueNames.forEach((person) => {
          if (person === user) return
          const personTimeOffs = timeOffs.filter((timeOff) => timeOff.name === person)
          const timeOffCompare = [...userTimeOffs, ...personTimeOffs]
          const overlaps = overlapTimes(timeOffCompare).includes(2)
          if (overlaps) {
            setPeopleWhoMatchUser((prev) => {
              if (!prev.includes(person)) {
                return [...prev, person]
              } else {
                return prev
              }
            })
          }
        })
      }}>Find Matching Users</button>
      <h4>People who have overlapping availability with {user}:</h4>
      {peopleWhoMatchUser.length > 0 ? peopleWhoMatchUser.map((person) => (
        <span key={person}>{person}, </span>
      )) : <p>No matching users found.</p>}
      <br/><br/>


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