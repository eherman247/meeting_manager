import { TimeSessionContext } from "../context/timeSessionContext";
import { useContext } from "react";

export const useTimeSessionContext = () => {
  const context = useContext(TimeSessionContext)
  if(!context){
    throw Error('useTimeSessionContext has to be inside a TimeSessionContextProvider')
  }
  return context
}