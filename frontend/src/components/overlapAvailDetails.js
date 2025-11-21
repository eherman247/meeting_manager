import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { useEffect, useMemo } from "react"
import { overlapTimes } from "../utils/overlapTimes"
import { consolidateArrayTimes } from "../utils/consolidateArrayTimes"

const OverlapAvailDetails = () => {
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
  }, [dispatch])

  const uniqueNames = useMemo(() => {
    return [...new Set(timeOffs ? timeOffs.map((timeOff) => timeOff.name) : [])]
  }, [timeOffs])
  const numUniqueNames = uniqueNames.length

  const overlaps = overlapTimes(timeOffs)

  console.log('overlaps array', overlaps)

  function getAllIndexesWithReduce(arr, val) {
  return arr.reduce((acc, element, index) => {
    if (element === val) {
      acc.push(index);
    }
    return acc;
  }, []);
  }

  const foundIndexes = getAllIndexesWithReduce(overlaps, numUniqueNames)

  const consolidated = consolidateArrayTimes(foundIndexes)

  console.log('Indexes', foundIndexes)
  console.log('number of unique names', numUniqueNames)
  console.log('total overlaps')
  console.log('consolidated overlaps', consolidated)
  // console.log('unique names', uniqueNames)

  return (
    <div className="overlap-avail-details">
      <h2 className="text-center">Overlapping Availability</h2>
      <p>Feature under development</p>
      { uniqueNames.map((name) => (
        <div key={name} className="overlap-name-section">
          <h3>{name}</h3>
        </div>
      ))}
    </div>
  )
}

export default OverlapAvailDetails