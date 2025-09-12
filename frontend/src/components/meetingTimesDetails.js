import { getTimeOffsDay } from "../utils/timeOffsDay"
import { minToTime } from "../utils/timeConvert"

const MeetingTimesDetails = ({timeOffs}) => {
  const timeOffsSunday = []
  const timeOffsMonday = []
  const timeOffsTuesday = []
  const timeOffsWednesday = []
  const timeOffsThursday = []
  const timeOffsFriday = []
  const timeOffsSaturday = []

  if(timeOffs){
    timeOffs.forEach((timeOff) => {
      switch (timeOff.day) {
        case "Sunday":
          timeOffsSunday.push(timeOff)
          break
        case "Monday":
          timeOffsMonday.push(timeOff)
          break
        case "Tuesday":
          timeOffsTuesday.push(timeOff)
          break
        case "Wednesday":
          timeOffsWednesday.push(timeOff)
          break
        case "Thursday":
          timeOffsThursday.push(timeOff)
          break
        case "Friday":
          timeOffsFriday.push(timeOff)
          break
        case "Saturday":
          timeOffsSaturday.push(timeOff)
          break
        default:
          break
      }
    })
  }

  const meetingTimesSunday = [0, 1439]
  const meetingTimesMonday = [0, 1439]
  const meetingTimesTuesday = [0, 1439]
  const meetingTimesWednesday = [0, 1439]
  const meetingTimesThursday = [0, 1439]
  const meetingTimesFriday = [0, 1439]
  const meetingTimesSaturday = [0, 1439]


  return (
    <div className="meeting-times-details">
      <h2>Suggested Meeting Times</h2>
      <div>
        <h3>Sunday</h3>
        {meetingTimesSunday.forEach((time) => {
          <p>6</p>
        })}
        {/* ${meetingTimesSunday.forEach((time) => {
          return(<p>${minToTime(time)}</p>)
        })} */}
        <br />
      </div>
      <div>
        <h3>Monday</h3>
        <br />
      </div>
      <div>
        <h3>Tuesday</h3>
        <br />
      </div>
      <div>
        <h3>Wednesday</h3>
        <br />
      </div>
      <div>
        <h3>Thursday</h3>
        <br />
      </div>
      <div>
        <h3>Friday</h3>
        <br />
      </div>
      <div>
        <h3>Saturday</h3>
        <br />
      </div>
    </div>
  )
}

export default MeetingTimesDetails