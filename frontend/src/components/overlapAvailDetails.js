import { overlapTimes } from "../utils/overlapTimes"
import { consolidateArrayTimes } from "../utils/consolidateArrayTimes"
import { minToTime } from "../utils/timeConvert"

const OverlapAvailDetails = ({timeOffs, filter, uniqueNames}) => {

  const numUniqueNames = uniqueNames.length - filter.peopleFilter.length

  for (const name of filter.peopleFilter) {
    timeOffs = timeOffs.filter((timeOff) => timeOff.name !== name)
  }

  const overlaps = overlapTimes(timeOffs)

  //console.log("overlaps in overlap avail details", overlaps)

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
  
  // apply filters

  const sunOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 0 && overlap.timeEnd < 1440 ) : []
  const filteredSunOverlaps = sunOverlaps.filter((overlap) => overlap.timeEnd - overlap.timeStart >= filter.timeFilter)
  filteredSunOverlaps.sort((a, b) => a.timeStart - b.timeStart);
  const monOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 1440 && overlap.timeEnd < 2880) : []
  const monFilteredOverlaps = monOverlaps.filter((overlap) => overlap.timeEnd - overlap.timeStart >= filter.timeFilter)
  monFilteredOverlaps.sort((a, b) => a.timeStart - b.timeStart);
  const tueOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 2880 && overlap.timeEnd < 4320) : []
  const tueFilteredOverlaps = tueOverlaps.filter((overlap) => overlap.timeEnd - overlap.timeStart >= filter.timeFilter)
  tueFilteredOverlaps.sort((a, b) => a.timeStart - b.timeStart);
  const wedOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 4320 && overlap.timeEnd < 5760) : []
  const wedFilteredOverlaps = wedOverlaps.filter((overlap) => overlap.timeEnd - overlap.timeStart >= filter.timeFilter)
  wedFilteredOverlaps.sort((a, b) => a.timeStart - b.timeStart);
  const thuOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 5760 && overlap.timeEnd < 7200) : []
  const thuFilteredOverlaps = thuOverlaps.filter((overlap) => overlap.timeEnd - overlap.timeStart >= filter.timeFilter)
  thuFilteredOverlaps.sort((a, b) => a.timeStart - b.timeStart);
  const friOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 7200 && overlap.timeEnd < 8640) : []
  const friFilteredOverlaps = friOverlaps.filter((overlap) => overlap.timeEnd - overlap.timeStart >= filter.timeFilter)
  friFilteredOverlaps.sort((a, b) => a.timeStart - b.timeStart);
  const satOverlaps = consolidated ? consolidated.filter((overlap) => overlap.timeStart >= 8640 && overlap.timeEnd < 10080) : []
  const satFilteredOverlaps = satOverlaps.filter((overlap) => overlap.timeEnd - overlap.timeStart >= filter.timeFilter)
  satFilteredOverlaps.sort((a, b) => a.timeStart - b.timeStart);

  return (
    <div className="overlap-avail-details">
      <h2 className="text-center">Overlapping Availability</h2>
      <div className="time-offs-by-day">
        <div className="time-off-day">
          <h3 className="time-off-day-head">Sunday</h3>
          {filteredSunOverlaps && filteredSunOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 1}>
              <p>{minToTime(overlap.timeStart)} - {minToTime(overlap.timeEnd)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Monday</h3>
          {monFilteredOverlaps && monFilteredOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 2}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Tuesday</h3>
          {tueFilteredOverlaps && tueFilteredOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 3}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Wednesday</h3>
          {wedFilteredOverlaps && wedFilteredOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 4}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Thursday</h3>
          {thuFilteredOverlaps && thuFilteredOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 5}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Friday</h3>
          {friFilteredOverlaps && friFilteredOverlaps.map((overlap) => (
            <div className="time-off-details" key={overlap.timeStart * 6}>
              <p>{minToTime(overlap.timeStart % 1440)} - {minToTime(overlap.timeEnd % 1440)}</p>
            </div>
          ))}
        </div>
        <div className="time-off-day">
          <h3 className="time-off-day-head">Saturday</h3>
          {satFilteredOverlaps && satFilteredOverlaps.map((overlap) => (
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