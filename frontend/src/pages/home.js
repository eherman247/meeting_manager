import {useEffect, useState} from 'react'

import TimeOffDetails from '../components/timeOffDetails'

const Home = () => {
  const [timeOffs, setTimeOffs] = useState(null)

  useEffect(() => {
    const fetchTimeOffs = async () => {
      const response = await fetch('/times')
      const json = await response.json()

      if(response.ok) {
        setTimeOffs(json)
      }
    }

    fetchTimeOffs()
  }, [])
  return (
    <div className="home">
      <div className='time'>
        {timeOffs && timeOffs.map((timeOff) => (
          <TimeOffDetails key={timeOff._id} timeOff={timeOff}/>
        ))}
      </div>
    </div>
  ) 
}

export default Home

