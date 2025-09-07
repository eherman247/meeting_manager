import { createContext, useReducer } from "react";

export const TimeOffContext = createContext()

export const timeOffReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMEOFF':
      return {
        timeOffs: action.payload
      }
    case 'CREATE_TIMEOFF':
      return {
        timeOffs: [action.payload, ...state.timeOffs]
      }
    case 'DELETE_TIMEOFF':
      return {
        timeOffs: state.timeOffs.filter((t) => t._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TimeOffContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(timeOffReducer, {
    timeOffs: null
  })

  
  return (
    <TimeOffContext.Provider value={{...state, dispatch}}>
      {children}
    </TimeOffContext.Provider>
  )
}