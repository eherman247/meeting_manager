import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TimeOffContextProvider } from './context/timeOffContext';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TimeOffContextProvider>
        <App />
      </TimeOffContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

