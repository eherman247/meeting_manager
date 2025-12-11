import {createContext, useReducer} from 'react'

export const TimeSessionContext = createContext()

export const timeSessionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMESESSIONS':
      return {
        timeSessions: action.payload
      }
    case 'CREATE_TIMESESSION':
      return {
        timeSessions: [action.payload, ...(state.timeSessions || [])]
      }
    case 'DELETE_TIMESESSION':
      return {
        timeSessions: (state.timeSessions || []).filter((t) => t._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TimeSessionContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(timeSessionReducer, {
    timeSessions: null
  })
  
  return (
    <TimeSessionContext.Provider value={{...state, dispatch}}>
      {children}
    </TimeSessionContext.Provider>
  )
}
