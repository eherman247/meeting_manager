
import TimeOffForm from '../components/timeOffForm'
import TimeOffsDisplay from '../components/timeOffsDisplay'
import OverlapAvailDetails from '../components/overlapAvailDetails'
import { useState } from 'react'

const TimeSession = () => {
  const [peopleFilter, setPeopleFilter] = useState([])
  const [timeFilter, setTimeFilter] = useState(0)

  const filter = {peopleFilter, timeFilter}

  return (
    <div className="home">
      <h1>{localStorage.getItem('currentTimeSession') ? JSON.parse(localStorage.getItem('currentTimeSession')).title : ''}</h1>
      <h2>Session Code: {localStorage.getItem('currentTimeSession') ? JSON.parse(localStorage.getItem('currentTimeSession'))._id : ''}</h2>
      <TimeOffsDisplay/>
      <TimeOffForm/>

      {/* <button onClick={() => {
        const person = prompt("Enter the name of the person to filter by:")
        if (person && !peopleFilter.includes(person)) {
          setPeopleFilter([...peopleFilter, person])
        }
      }}>Add Person Filter</button>
      <br/> */}
      <label>Minimum Overlap Time (minutes): </label>
      <input
        type="number"
        value={timeFilter}
        onChange={(e) => setTimeFilter(parseInt(e.target.value))}
        min="0"
      />
      <br/>
      <button onClick={() => {
        setPeopleFilter([])
        setTimeFilter(0)
      }}>Clear Filters</button>
      <OverlapAvailDetails filter={filter}/>
      <br/>
      <button onClick={() => {
        localStorage.removeItem('currentTimeSession')
        window.location.reload()
      }}>Leave Time Session</button>
    </div>
  ) 
}

export default TimeSession