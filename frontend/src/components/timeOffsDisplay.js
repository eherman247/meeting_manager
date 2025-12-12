import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { useEffect } from "react"
import TimeOffDetails from "./timeOffDetails"

import { useAuthContext } from "../hooks/useAuthContext"


const TimeOffsDisplay = () => {
  const {timeOffs, dispatch} = useTimeOffContext()
  const { user } = useAuthContext()

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
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok) {
        dispatch({type: 'SET_TIMEOFF', payload: json})
      }
    }

    if (user) {
      fetchTimeOffs()
    }
  }, [dispatch, user])

  const sunTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Sunday") : []
  const monTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Monday") : []
  const tueTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Tuesday") : []
  const wedTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Wednesday") : []
  const thuTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Thursday") : []
  const friTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Friday") : []
  const satTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Saturday") : []

  return (
    <div className="time-offs-display">
      <h2 className="text-center">Availability</h2>
      <div className="time-offs-by-day">
        <div className="time-off-day">
          <h3 className="time-off-day-head">Sunday</h3>
          {sunTimeOffs && sunTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Monday</h3>
          {monTimeOffs && monTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Tuesday</h3>
          {tueTimeOffs && tueTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Wednesday</h3>
          {wedTimeOffs && wedTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Thursday</h3>
          {thuTimeOffs && thuTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Friday</h3>
          {friTimeOffs && friTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Saturday</h3>
          {satTimeOffs && satTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimeOffsDisplay