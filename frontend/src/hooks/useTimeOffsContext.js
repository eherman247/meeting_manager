import { TimeOffContext } from "../context/timeOffContext";
import { useContext } from "react";

export const useTimeOffContext = () => {
  const context = useContext(TimeOffContext)

  if(!context){
    throw Error('useTimeOffContext has to be inside a TimeOffContextProvider')
  }

  return context
}

