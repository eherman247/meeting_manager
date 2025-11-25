export const consolidateArrayTimes = (timesArray) => {

  const consolidated = []

  const time = class {
    constructor(timeStart, timeEnd) {
      this.timeStart = timeStart
      this.timeEnd = timeEnd
    }
  }

  if(timesArray){
    let currentTime = new time(timesArray[0], timesArray[0])
    for (let i = 0; i < timesArray.length - 1; i++){
      if(timesArray[i] + 1 === timesArray[i + 1]){
        currentTime.timeEnd = timesArray[i + 1]
      }
      else{
        consolidated.push(currentTime)
        currentTime = new time(timesArray[i + 1], timesArray[i + 1])
      }
    }
    if(currentTime.timeStart != null && currentTime.timeEnd != null)
      consolidated.push(currentTime)
  }
  if(consolidated.length > 0)
    return consolidated
  else
    return null
}
