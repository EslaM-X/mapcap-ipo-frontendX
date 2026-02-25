import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * Entry point for MapCap IPO Dashboard.
 * Integrated with Pi Network Sandbox for real-time on-chain data.
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
