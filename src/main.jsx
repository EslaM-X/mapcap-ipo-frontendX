/**
 * MapCapIPO Entry Point
 * Built by EslaM-X | Architected for Pi Network Ecosystem
 * * This file bootstraps the React application into the DOM and 
 * ensures the execution of the global styles defined for the IPO phase.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Global CSS reset for the official MapCap white-theme & single-screen layout
import './index.css'

// The core engine connecting Pi SDK, MERN Backend, and Philip's Vision
import App from './App.jsx'

/**
 * Rendering the Root Component.
 * StrictMode is enabled to catch potential lifecycle issues early in development,
 * ensuring high reliability for financial transactions (U2A/A2UaaS).
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
