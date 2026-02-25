import axios from 'axios';

// Base URL pointing to our Node.js Backend on port 3001
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Pi Network Service: Bridges Frontend with On-chain Logic.
 * Simple, maintainable, and strictly typed.
 */
export const piService = {
    /**
     * Fetches current IPO metrics from Backend.
     * Prevents NaN by returning default numeric values on failure.
     */
    async getIpoStatus() {
        try {
            const response = await axios.get(`${API_BASE_URL}/status`);
            return response.data;
        } catch (error) {
            console.error("Dashboard sync failed. Check Port 3001.");
            return {
                totalInvestors: 0,
                totalPiInvested: 0,
                userPiBalance: 0,
                spotPrice: 0.35,
                history: []
            };
        }
    },

    /**
     * Executes On-chain U2A investment flow via Pi SDK.
     */
    async invest(amount: number) {
        try {
            // Check if Pi SDK is available in the environment
            if (!(window as any).Pi) throw new Error("Pi SDK not found");

            return await (window as any).Pi.createPayment({
                amount: amount,
                memo: "MapCap IPO Investment",
                metadata: { type: "U2A_IPO" }
            }, {
                onReadyForServerApproval: async (paymentId: string) => {
                    // Sync with backend to update spot price and metrics
                    await axios.post(`${API_BASE_URL}/invest`, { amount, paymentId });
                },
                onReadyForServerCompletion: (paymentId: string, txid: string) => {
                    console.log("On-chain Success. TxID:", txid);
                    window.location.reload(); 
                },
                onCancel: (paymentId: string) => { console.log("Transaction cancelled"); },
                onError: (error: any) => { console.error("Payment Error:", error.message); }
            });
        } catch (err) {
            console.error("SDK Flow aborted", err);
        }
    }
};
