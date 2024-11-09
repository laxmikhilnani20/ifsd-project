import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './AppContext'; // Import your context provider

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
