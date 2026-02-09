/**
 * MapCap Pi Network Web3 Service v1.2
 * ---------------------------------------------------------
 * Lead Architect: Eslam Kora | AppDev @Map-of-Pi
 * Project: MapCap Ecosystem (Philip Jennings & Daniel Spec)
 * * * Purpose: 
 * Manages the native Pi Browser SDK bridge for Authentication 
 * and U2A (User-to-App) payments in a Non-Custodial manner.
 */

export const PiService = {
  /**
   * AUTHENTICATE
   * Handshakes with Pi Browser and requests data scopes.
   * [Source: Philip's Spec Page 4 - Real-time Identity]
   */
  authenticate: async () => {
    try {
      const scopes = ['username', 'payments', 'wallet_address'];
      
      /**
       * Incomplete Payment Callback: 
       * Daniel's Requirement: Critical for handling edge cases where a 
       * transaction was signed on-chain but not confirmed by our server.
       */
      const auth = await window.Pi.authenticate(scopes, (onIncompletePaymentFound) => {
        console.warn("Audit-Alert: Incomplete payment found during auth:", onIncompletePaymentFound);
        // Here, we should ideally trigger a server-side completion check.
      });
      
      return auth.user;
    } catch (err) {
      console.error("SDK Auth Failure: Handshake rejected by Pioneer or Network.", err);
      throw err;
    }
  },

  /**
   * CREATE IPO PAYMENT (U2A)
   * Executes the 'Water-Level' investment flow within the Pi Mainnet/Testnet.
   * * @param {number} amount - Pi tokens for MapCap equity.
   * @param {function} onApproved - Bridge to backend ledger sync.
   */
  createIpoPayment: async (amount, onApproved) => {
    try {
      // Input sanitization for blockchain precision
      const piAmount = parseFloat(amount).toFixed(2);

      const payment = await window.Pi.createPayment({
        amount: parseFloat(piAmount),
        memo: `MapCap IPO Participation: Entry @ -20% LP Value`,
        metadata: { 
          phase: "IPO_2026",
          type: "U2A_INVESTMENT",
          audit_code: "MAPCAP-ALPHA"
        },
      }, {
        // STEP 1: Server-side Approval Trigger
        onReadyForServerApproval: (paymentId) => {
          console.log("Payment ID created, awaiting backend approval:", paymentId);
          onApproved(paymentId);
        },
        
        // STEP 2: Blockchain Finalization
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("MapCap Ledger Finalized. TXID:", txid);
        },

        // STEP 3: User Interaction Handlers
        onCancel: (paymentId) => {
          console.log("Pioneer cancelled investment:", paymentId);
        },

        onError: (error, payment) => {
          console.error("Critical SDK Payment Error:", error);
          if (payment) {
            console.error("Stuck Payment Details:", payment);
          }
        }
      });
      
      return payment;
    } catch (err) {
      console.error("Payment Orchestration Failure:", err);
      throw err;
    }
  }
};

export default PiService;
