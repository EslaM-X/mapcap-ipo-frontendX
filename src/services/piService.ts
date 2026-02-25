import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Service handling Pi Network on-chain interactions and backend synchronization.
 */
export const piService = {
    /**
     * Retrieves current IPO metrics and price history.
     */
    async getIpoStatus() {
        try {
            const response = await axios.get(`${API_BASE_URL}/status`);
            return response.data;
        } catch (error) {
            console.error("Sync error: Backend unreachable.");
            return { totalInvestors: 0, totalPiInvested: 0, userPiBalance: 0, spotPrice: 0.35, history: [] };
        }
    },

    /**
     * Executes U2A payment flow through Pi SDK.
     */
    async invest(amount: number) {
        try {
            if (!(window as any).Pi) throw new Error("Pi SDK not initialized");

            return await (window as any).Pi.createPayment({
                amount,
                memo: "MapCap IPO Investment",
                metadata: { type: "U2A_INVEST" }
            }, {
                onReadyForServerApproval: async (paymentId: string) => {
                    await axios.post(`${API_BASE_URL}/invest`, { amount, paymentId });
                },
                onReadyForServerCompletion: (paymentId: string, txid: string) => {
                    window.location.reload(); 
                },
                onCancel: () => console.log("User cancelled"),
                onError: (err: any) => console.error("SDK Error:", err.message)
            });
        } catch (err) {
            console.error("Investment failed", err);
        }
    },

    /**
     * Initiates A2U withdrawal request.
     */
    async withdraw(amount: number) {
        try {
            const response = await axios.post(`${API_BASE_URL}/withdraw`, { amount });
            return response.data;
        } catch (err) {
            console.error("Withdrawal failed", err);
            throw err;
        }
    }
};
