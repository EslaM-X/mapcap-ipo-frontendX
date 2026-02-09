/**
 * MapCap IPO - Official Entry Point v1.2
 * ---------------------------------------------------------
 * Lead Architect: Eslam Kora | AppDev @Map-of-Pi
 * Project: MapCap Ecosystem Implementation
 * * Purpose: 
 * This is the root of the React tree. It initializes the DOM,
 * injects foundational styles, and wraps the application in the
 * IpoProvider to enable global Web3 state management.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1. Injected Guardrail Styles: Ensures the Single-Screen Policy [Source: Page 8]
import './index.css';

// 2. Core Application Engine: The structural layout of the 33.33vh pillars
import App from './App.jsx';

// 3. Global State Orchestrator: Connects Pi SDK and MERN Backend
import { IpoProvider } from './context/IpoContext';

/**
 * ROOT RENDERER
 * Wrapping <App /> with <IpoProvider> ensures that the 'useIpo' hook 
 * works flawlessly across all functional components (Navbar, Stats, Actions).
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* The Provider serves as the 'Single Source of Truth' for Daniel's Audit trail */}
    <IpoProvider>
      <App />
    </IpoProvider>
  </StrictMode>,
);
