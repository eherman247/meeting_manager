const minToTime = (minutes) => {
  if(minutes >= 1440){
    return "exeeded time limit"
  }
  let hour = 12
  let ampm = "am"
  if(minutes < 60){
    hour = 12
    ampm = "am"
  }
  else if(minutes >= 60 && minutes < 780){
    hour = Math.floor(minutes/60)
    ampm = "am"
  }
  else{
    hour = Math.floor(minutes/60) - 12
    ampm = "pm"
  }

  let mins
  if(minutes % 60 < 10){
    mins = "0" + String(minutes % 60)
  }
  else
    mins = String(minutes % 60)
  return String(hour) + ":" + mins + ampm
}

export default minToTime