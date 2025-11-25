import { useTimeOffContext } from "../hooks/useTimeOffsContext"
import { useEffect, useMemo } from "react"
import { overlapTimes } from "../utils/overlapTimes"
import { consolidateArrayTimes } from "../utils/consolidateArrayTimes"
import { minToTime } from "../utils/timeConvert"

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
  
  const sunOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart > 0 && overlap.timeEnd < 1440 ) : []
  const monOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 1440 && overlap.timeEnd < 2880) : []
  const tueOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 2880 && overlap.timeEnd < 4320) : []
  const wedOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 4320 && overlap.timeEnd < 5760) : []
  const thuOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 5760 && overlap.timeEnd < 7200) : []
  const friOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 7200 && overlap.timeEnd < 8640) : []
  const satOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 8640 && overlap.timeEnd < 10080) : []

  return (
    <div className="overlap-avail-details">
      <h2 className="text-center">Overlapping Availability</h2>
      <div className="time-offs-by-day">
        <div className="time-off-day">
          <h3 className="time-off-day-head">Sunday</h3>
          {sunOverlaps && sunOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 1}>
              <p>{minToTime(overlap.timeStart)} - {minToTime(overlap.timeEnd)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Monday</h3>
          {monOverlaps && monOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 2}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Tuesday</h3>
          {tueOverlaps && tueOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 3}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Wednesday</h3>
          {wedOverlaps && wedOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 4}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Thursday</h3>
          {thuOverlaps && thuOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 5}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Friday</h3>
          {friOverlaps && friOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 6}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Saturday</h3>
          {satOverlaps && satOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 7}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OverlapAvailDetails