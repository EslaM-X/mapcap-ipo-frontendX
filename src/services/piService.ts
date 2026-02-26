import axios from 'axios';

/** * Using 127.0.0.1 for local loopback ensures stable communication 
 * within the Termux environment.
 */
const API_BASE_URL = 'http://127.0.0.1:3001/api';

export const piService = {
    
    // Synchronizes UI metrics with the backend's current state
    async getIpoStatus() {
        try {
            const response = await axios.get(`${API_BASE_URL}/status`);
            return response.data;
        } catch (error) {
            console.error("Connectivity issue: Dashboard failed to sync.");
            return { totalInvestors: 0, totalPiInvested: 0, userPiBalance: 0, spotPrice: 0.35, history: [] };
        }
    },

    // Orchestrates the Pi SDK U2A payment flow
    async invest(amount: number) {
        try {
            if (!(window as any).Pi) throw new Error("Please open via Pi Browser");

            return await (window as any).Pi.createPayment({
                amount,
                memo: "MapCap IPO Investment",
                metadata: { type: "U2A_INVEST" }
            }, {
                onReadyForServerApproval: async (paymentId: string) => {
                    // Syncs payment ID with backend for verification
                    await axios.post(`${API_BASE_URL}/invest`, { amount, paymentId });
                },
                onReadyForServerCompletion: async (paymentId: string, txid: string) => {
                    console.log("On-chain transaction ID:", txid);
                },
                onCancel: () => console.log("Transaction aborted by user"),
                onError: (err: any) => console.error("SDK logic error:", err.message)
            });
        } catch (err) {
            console.error("Investment workflow failed", err);
            throw err;
        }
    },

    // Relays withdrawal requests to the backend API
    async withdraw(amount: number) {
        try {
            const response = await axios.post(`${API_BASE_URL}/withdraw`, { amount });
            return response.data;
        } catch (err) {
            console.error("Withdrawal service rejected the request", err);
            throw err;
        }
    }
};
