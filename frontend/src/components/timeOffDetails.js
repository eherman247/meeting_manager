import {minToTime} from "../utils/timeConvert"
import { useTimeOffContext } from "../hooks/useTimeOffsContext"

const TimeOffDetails = ({timeOff}) => {
  const {dispatch} = useTimeOffContext()

  const handleClick = async () => {
    const response = await fetch('/times/' + timeOff._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_TIMEOFF', payload: json})
    }
  }

  return (
    <div className="time-off-details">
      <p>{minToTime(timeOff.timeStart)} - {minToTime(timeOff.timeEnd)}</p>
      <button onClick={handleClick}>delete</button>
    </div>
  )
}

export default TimeOffDetails