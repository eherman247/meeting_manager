
import TimeOffForm from '../components/timeOffForm'
import TimeOffsDisplay from '../components/timeOffsDisplay'
import OverlapAvailDetails from '../components/overlapAvailDetails'

const TimeSession = () => {


  return (
    <div className="home">
      <TimeOffsDisplay/>
      <TimeOffForm/>
      <OverlapAvailDetails/>
    </div>
  ) 
}

export default TimeSession