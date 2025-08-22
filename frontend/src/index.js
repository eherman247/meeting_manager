import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TimeOffContextProvider } from './context/timeOffContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TimeOffContextProvider>
      <App />
    </TimeOffContextProvider>
  </React.StrictMode>
);

