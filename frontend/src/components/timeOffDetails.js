import {minToTime} from "../utils/timeConvert"

const TimeOffDetails = ({timeOff}) => {
  return (
    <div className="time-details">
      <h3>{timeOff.day}</h3>
      <p>{minToTime(timeOff.timeStart)} - {minToTime(timeOff.timeEnd)}</p>
    </div>
  )
}

export default TimeOffDetails