/**
 * MapCap Pioneer Authentication Service
 * ---------------------------------------------------------
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Project: MapCap Ecosystem Auth Logic
 * * Purpose: 
 * Handles the Pi SDK handshake, scopes authorization, 
 * and persistent session management for the single-screen layout.
 */

/**
 * authenticatePioneer
 * Initiates the Pi Network native authentication flow.
 * [Source: Pi SDK Documentation & Map-of-Pi Security Standards]
 */
export const authenticatePioneer = async () => {
  try {
    // 1. Define required scopes as per Daniel's compliance requirements
    const scopes = ['username', 'payments', 'wallet_address'];

    // 2. Trigger SDK Authentication
    const auth = await window.Pi.authenticate(scopes, (incompletePayment) => {
      // Daniel's Requirement: Handle orphan payments from previous sessions
      console.warn("Orphan/Incomplete payment detected:", incompletePayment);
      // Logic for server-side payment recovery can be triggered here
    });

    // 3. Persistent Session Management
    // Storing the user object in LocalStorage for fast UI hydration
    localStorage.setItem('pioneer_session', JSON.stringify({
      username: auth.user.username,
      uid: auth.user.uid,
      authenticatedAt: new Date().toISOString()
    }));

    return auth.user;
  } catch (err) {
    console.error("Critical Auth Error: Handshake with Pi Browser failed.", err);
    throw err;
  }
};

/**
 * getStoredPioneer
 * Recovers the session from local storage without re-triggering the SDK popup.
 */
export const getStoredPioneer = () => {
  const session = localStorage.getItem('pioneer_session');
  return session ? JSON.parse(session) : null;
};

/**
 * clearPioneerSession
 * Safely logs out the user and clears sensitive session data.
 */
export const clearPioneerSession = () => {
  localStorage.removeItem('pioneer_session');
};
