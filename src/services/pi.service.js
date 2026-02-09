/**
 * Pi Network Web3 Service
 * Encapsulates all Pi SDK logic for U2A (User-to-App) payments.
 * Following Philip's security standards for transaction memoing.
 */

export const createIpoPayment = async (amount, metadata) => {
  return new Promise((resolve, reject) => {
    window.Pi.createPayment({
      amount: amount,
      memo: `MapCap IPO Contribution: ${amount} Pi`,
      metadata: metadata,
    }, {
      onReadyForServerApproval: (paymentId) => resolve({ status: 'approved', paymentId }),
      onReadyForServerCompletion: (paymentId, txid) => resolve({ status: 'completed', paymentId, txid }),
      onCancel: (paymentId) => reject({ status: 'cancelled', paymentId }),
      onError: (error, payment) => reject({ status: 'error', error, payment }),
    });
  });
};
