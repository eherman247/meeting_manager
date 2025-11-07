import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { useEffect } from "react"
import TimeOffDetails from "./timeOffDetails"

const TimeOffsDisplay = () => {
  const {timeOffs, dispatch} = useTimeOffContext()

  useEffect(() => {
    const fetchTimeOffs = async () => {
      const response = await fetch('/times')
      const json = await response.json()

      if(response.ok) {
        dispatch({type: 'SET_TIMEOFF', payload: json})
      }
    }

    fetchTimeOffs()
  })

  const sunTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Sunday") : []
  const monTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Monday") : []
  const tueTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Tuesday") : []
  const wedTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Wednesday") : []
  const thuTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Thursday") : []
  const friTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Friday") : []
  const satTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Saturday") : []

  return (
    <div className="time-offs-display">
      <h2>Availability</h2>
      <div className="time-offs-by-day">
        <div className="time-off-day">
          <h3>Sunday</h3>
          {sunTimeOffs && sunTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3>Monday</h3>
          {monTimeOffs && monTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3>Tuesday</h3>
          {tueTimeOffs && tueTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3>Wednesday</h3>
          {wedTimeOffs && wedTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3>Thursday</h3>
          {thuTimeOffs && thuTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3>Friday</h3>
          {friTimeOffs && friTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
        <div className="time-off-day">
          <h3>Saturday</h3>
          {satTimeOffs && satTimeOffs.map((timeOff) => (
            <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimeOffsDisplay