import {minToTime} from "../utils/timeConvert"
import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TimeOffDetails = ({timeOff}) => {
  const {dispatch} = useTimeOffContext()
  const { user } = useAuthContext()

  const handleClick = async () => {

    if(!user){
      return
    }

    const response = await fetch('/times/' + timeOff._id, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_TIMEOFF', payload: json})
    }
  }

  return (
    <div className="time-off-details">
      <h4>{timeOff.name}</h4>
      <p>{minToTime(timeOff.timeStart)} - {minToTime(timeOff.timeEnd)}</p>
      <button onClick={handleClick}>delete</button>
    </div>
  )
}

export default TimeOffDetails