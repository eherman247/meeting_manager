export const overlapTimes = (timeOffs) => {

  const overlaps = new Array(10080).fill(0)

  if(timeOffs){
    timeOffs.forEach((timeOff) => {
      let multiplier = 0
      switch(timeOff.day){
        case "Sunday":
          multiplier = 0
          break
        case "Monday":
          multiplier = 1
          break
        case "Tuesday":
          multiplier = 2
          break
        case "Wednesday":
          multiplier = 3
          break
        case "Thursday":
          multiplier = 4
          break
        case "Friday":
          multiplier = 5
          break
        case "Saturday":
          multiplier = 6
          break
        default:
          multiplier = 0
      }
      for (let j = timeOff.timeStart; j < timeOff.timeEnd; j++) {
        overlaps[j + multiplier * 1440] += 1
      }
    })
  }

  return overlaps

}