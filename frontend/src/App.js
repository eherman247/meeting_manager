import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/main';
import Login from './pages/login';
import CreateAccount from './pages/createAccount';
import SessionsOverview from './pages/sessionsOverview';
import TimeSessionCreation from './pages/timeSessionCreation';
import TimeSession from './pages/timeSession';
import JoinSession from './pages/joinSession';


import Navbar from './components/navbar';


function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
              >
              
            </Route>
            <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/" />}
              >
              
            </Route>

            <Route
              path="/createAccount"
              element={!user ? <CreateAccount/> : <Navigate to="/" />}
              >
              
            </Route>
            <Route
              path="/sessionsOverview"
              element={user ? <SessionsOverview/> : <Navigate to="/login" />}
              >
              
            </Route>
            <Route
              path="/timeSessionCreation"
              element={user ? <TimeSessionCreation/> : <Navigate to="/login" />}
              >
            </Route>
            <Route
              path="/timeSession"
              element={user ? <TimeSession/> : <Navigate to="/login" />}
              >
              
            </Route>
            <Route
              path="/joinSession"
              element={user ? <JoinSession/> : <Navigate to="/login" />}
              >
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
