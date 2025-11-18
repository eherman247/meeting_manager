import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { useEffect } from "react"

const OverlapAvailDetails = () => {
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

  // const sunTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Sunday") : []
  // const monTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Monday") : []
  // const tueTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Tuesday") : []
  // const wedTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Wednesday") : []
  // const thuTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Thursday") : []
  // const friTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Friday") : []
  // const satTimeOffs = timeOffs ? timeOffs.filter((timeOff) => timeOff.day === "Saturday") : []

  const names = timeOffs ? timeOffs.map((timeOff) => timeOff.name) : []
  const uniqueNames = [...new Set(names)]
  // console.log('unique names', uniqueNames)

  return (
    <div className="overlap-avail-details">
      <h2 className="text-center">Overlapping Availability</h2>
      <p>Feature under development</p>
      { uniqueNames.map((name) => (
        <div key={name} className="overlap-name-section">
          <h3>{name}</h3>
        </div>
      ))}
    </div>
  )
}

export default OverlapAvailDetails