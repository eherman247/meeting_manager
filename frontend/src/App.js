import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/main';
import Login from './pages/login';
import CreateAccount from './pages/createAccount';
import SessionsOverview from './pages/sessionsOverview';
import TimeSession from './pages/timeSession';


import Navbar from './components/navbar';


function App() {
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
              element={<Login/>}
              >
              
            </Route>

            <Route
              path="/createAccount"
              element={<CreateAccount/>}
              >
              
            </Route>
            <Route
              path="/sessionsOverview"
              element={<SessionsOverview/>}
              >
              
            </Route>
            <Route
              path="/timeSession"
              element={<TimeSession/>}
              >
              
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
