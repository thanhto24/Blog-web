import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ensure this path is correct

// Render the root component (App) into the root div
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
