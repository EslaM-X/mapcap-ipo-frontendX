/**
 * usePiNetwork - Pi SDK Bridge v1.0
 * ---------------------------------------------------------
 * Handles Authentication and Payments within the Pi Browser.
 */
import { useState, useEffect } from 'react';

export const usePiNetwork = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if Pi SDK is available (Injected by Pi Browser)
    if (window.Pi) {
      const scopes = ['username', 'payments'];
      
      window.Pi.authenticate(scopes, (onIncompletePaymentFound) => {
        // Handle incomplete payments logic here [Daniel's Audit Rule]
      })
      .then((auth) => {
        setUser(auth.user);
        setAuthenticated(true);
      })
      .catch((err) => console.error("Pi Auth Failed:", err));
    }
  }, []);

  const createPayment = async (amount, memo) => {
    if (!window.Pi) return;
    
    return window.Pi.createPayment({
      amount,
      memo,
      metadata: { type: "IPO_INVESTMENT" },
    }, {
      onReadyForServerApproval: (paymentId) => { /* Sync with Backend */ },
      onReadyForServerCompletion: (paymentId, txid) => { /* Finalize */ },
      onCancel: (paymentId) => { /* Log cancelation */ },
      onError: (error, paymentId) => { /* Audit failure */ },
    });
  };

  return { user, authenticated, createPayment };
};
