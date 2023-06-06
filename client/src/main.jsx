import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { AuthContextProvider } from './context/AuthContext.jsx';
import { GoalContextProvider } from './context/GoalContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoalContextProvider>
        <App />
      </GoalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
