import {useEffect} from 'react'

import { useTimeOffContext } from '../hooks/useTimeOffsContext'

import TimeOffDetails from '../components/timeOffDetails'
import TimeOffForm from '../components/timeOffForm'
import MeetingTimesDetails from '../components/meetingTimesDetails'

const Home = () => {
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
  return (
    <div className="home">
      <div className='time'>
        {timeOffs && timeOffs.map((timeOff) => (
          <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
        ))}
      </div>
      <TimeOffForm/>
      <MeetingTimesDetails/>
    </div>
  ) 
}

export default Home

