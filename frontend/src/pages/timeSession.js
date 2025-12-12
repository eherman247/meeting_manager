
import TimeOffForm from '../components/timeOffForm'
import TimeOffsDisplay from '../components/timeOffsDisplay'
import OverlapAvailDetails from '../components/overlapAvailDetails'

const TimeSession = () => {


  return (
    <div className="home">
      <h1>{localStorage.getItem('currentTimeSession') ? JSON.parse(localStorage.getItem('currentTimeSession')).title : ''}</h1>
      <TimeOffsDisplay/>
      <TimeOffForm/>
      <OverlapAvailDetails/>
      <br/>
      <button onClick={() => {
        localStorage.removeItem('currentTimeSession')
        window.location.reload()
      }}>Leave Time Session</button>
    </div>
  ) 
}

export default TimeSession