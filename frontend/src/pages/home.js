
import TimeOffForm from '../components/timeOffForm'
import MeetingTimesDetails from '../components/meetingTimesDetails'
import TimeOffsDisplay from '../components/timeOffsDisplay'

const Home = () => {


  return (
    <div className="home">
      <TimeOffsDisplay/>
      <TimeOffForm/>
      {/* <MeetingTimesDetails timeOffs={timeOffs}/> */}
    </div>
  ) 
}

export default Home

