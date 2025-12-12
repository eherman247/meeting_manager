import { useAuthContext } from "./useAuthContext"
import { useTimeOffContext } from "./useTimeOffsContext"

export const useLogout = () => { 
  const { dispatch } = useAuthContext()
  const { dispatch: timeOffsDispatch } = useTimeOffContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    localStorage.removeItem('currentTimeSession')
    // update auth context
    dispatch({ type: 'LOGOUT' })
    timeOffsDispatch({ type: 'SET_TIMEOFF', payload: null })
  }

  return { logout }
}