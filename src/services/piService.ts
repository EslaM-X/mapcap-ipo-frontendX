import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/ipo';

/**
 * Pi Network SDK & Backend Sync.
 * Manages On-chain payments and real-time data fetching.
 */
export const piService = {
    // 1. Test Function: Syncs Dashboard with Backend
    async getIpoStatus() {
        try {
            const response = await axios.get(`${API_BASE_URL}/status`);
            return response.data;
        } catch (error) {
            console.error("Sync Error:", error);
            throw error;
        }
    },

    // 2. Main Action: Handles U2A On-chain Investment
    async initiateInvestment(amount: number) {
        try {
            return await window.Pi.createPayment({
                amount: amount,
                memo: "MapCap IPO Investment",
                metadata: { type: "U2A_IPO" }
            }, {
                onReadyForServerApproval: async (paymentId: string) => {
                    // Step 1: Backend approval & Spot Price update
                    await axios.post(`${API_BASE_URL}/invest`, { amount, paymentId });
                },
                onReadyForServerCompletion: (paymentId: string, txid: string) => {
                    console.log("On-chain Success. TxID:", txid);
                    window.location.reload(); 
                },
                onCancel: (paymentId: string) => { console.log("User cancelled"); },
                onError: (error: any) => { console.error("SDK Error:", error.message); }
            });
        } catch (err) {
            console.error("SDK Failed", err);
        }
    }
};
