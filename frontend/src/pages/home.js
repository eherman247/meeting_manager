
import TimeOffForm from '../components/timeOffForm'
import MeetingTimesDetails from '../components/meetingTimesDetails'
import TimeOffsDisplay from '../components/timeOffsDisplay'
import OverlapAvailDetails from '../components/overlapAvailDetails'

const Home = () => {


  return (
    <div className="home">
      <TimeOffsDisplay/>
      <TimeOffForm/>
      <OverlapAvailDetails/>
      {/* <MeetingTimesDetails timeOffs={timeOffs}/> */}
    </div>
  ) 
}

export default Home

