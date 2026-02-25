import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Pi Network Service: Core logic for on-chain payments and backend sync.
 */
export const piService = {
    /**
     * Fetches real-time IPO metrics. 
     * Returns default values on failure to prevent UI crashes (NaN).
     */
    async getIpoStatus() {
        try {
            const response = await axios.get(`${API_BASE_URL}/status`);
            return response.data;
        } catch (error) {
            console.error("Dashboard sync failed. Port 3001 unreachable.");
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
     * Initiates U2A payment flow via Pi SDK.
     * Updates backend state upon on-chain approval.
     */
    async invest(amount: number) {
        try {
            if (!(window as any).Pi) throw new Error("Pi SDK missing");

            return await (window as any).Pi.createPayment({
                amount,
                memo: "MapCap IPO Investment",
                metadata: { type: "U2A_IPO" }
            }, {
                onReadyForServerApproval: async (paymentId: string) => {
                    // Sync backend with the approved transaction
                    await axios.post(`${API_BASE_URL}/invest`, { amount, paymentId });
                },
                onReadyForServerCompletion: (paymentId: string, txid: string) => {
                    console.log("Payment successful. TxID:", txid);
                    window.location.reload(); 
                },
                onCancel: (paymentId: string) => console.log("User cancelled payment"),
                onError: (error: any) => console.error("SDK Payment Error:", error.message)
            });
        } catch (err) {
            console.error("Investment flow failed", err);
        }
    }
};
