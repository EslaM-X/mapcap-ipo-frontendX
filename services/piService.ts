// Pi Network SDK On-chain interaction
export const initiateInvestment = async (amount: number) => {
    try {
        const payment = await window.Pi.createPayment({
            amount: amount,
            memo: "MapCap IPO Investment",
            metadata: { type: "U2A_IPO" }
        }, {
            onReadyForServerApproval: (paymentId) => { /* Backend sync */ },
            onReadyForServerCompletion: (paymentId, txid) => { console.log("Tx Success:", txid); },
            onCancel: (paymentId) => { /* User cancelled */ },
            onError: (error) => { console.error("On-chain Error:", error.message); }
        });
        return payment;
    } catch (err) {
        console.error("SDK Failed", err);
    }
};

