import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Service orchestrating Pi Network on-chain payments and backend synchronization.
 * Designed for simplicity and maintainability.
 */
export const piService = {
    
    // Fetches real-time IPO metrics and price history for the dashboard
    async getIpoStatus() {
        try {
            const response = await axios.get(`${API_BASE_URL}/status`);
            return response.data;
        } catch (error) {
            console.error("Sync error: Backend unreachable.");
            return { totalInvestors: 0, totalPiInvested: 0, userPiBalance: 0, spotPrice: 0.35, history: [] };
        }
    },

    // Handles the U2A payment flow using Pi SDK
    async invest(amount: number) {
        try {
            if (!(window as any).Pi) throw new Error("Pi SDK not initialized");

            return await (window as any).Pi.createPayment({
                amount,
                memo: "MapCap IPO Investment",
                metadata: { type: "U2A_INVEST" }
            }, {
                // Syncs on-chain payment with backend for server-side approval
                onReadyForServerApproval: async (paymentId: string) => {
                    await axios.post(`${API_BASE_URL}/invest`, { amount, paymentId });
                },
                onReadyForServerCompletion: async (paymentId: string, txid: string) => {
                    console.log("Payment confirmed on-chain:", txid);
                },
                onCancel: () => console.log("User cancelled payment"),
                onError: (err: any) => console.error("Pi SDK Error:", err.message)
            });
        } catch (err) {
            console.error("Investment logic failed", err);
            throw err;
        }
    },

    // Requests A2U withdrawal through backend relay
    async withdraw(amount: number) {
        try {
            const response = await axios.post(`${API_BASE_URL}/withdraw`, { amount });
            return response.data;
        } catch (err) {
            console.error("Withdrawal service error", err);
            throw err;
        }
    }
};
