import axios from 'axios';

/**
 * Pi Network SDK On-chain interaction.
 * Integrates Pi Payments with our local Backend sync.
 */
export const initiateInvestment = async (amount: number) => {
    try {
        const payment = await window.Pi.createPayment({
            amount: amount,
            memo: "MapCap IPO Investment",
            metadata: { type: "U2A_IPO" }
        }, {
            onReadyForServerApproval: async (paymentId) => {
                // Step 1: Tell our backend to verify/approve the paymentId
                await axios.post('http://localhost:3001/api/ipo/invest', { amount, paymentId });
            },
            onReadyForServerCompletion: (paymentId, txid) => {
                console.log("On-chain Success. TxID:", txid);
                // Refresh UI to show new spot price
                window.location.reload();
            },
            onCancel: (paymentId) => { console.log("Payment cancelled by user"); },
            onError: (error) => { console.error("On-chain Error:", error.message); }
        });
        return payment;
    } catch (err) {
        console.error("SDK Failed", err);
    }
};
