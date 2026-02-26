import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

interface ActionProps {
    onTransactionSuccess: () => void;
}

/**
 * Handles IPO participation via Pi SDK payments.
 * Synchronizes on-chain actions with local dashboard metrics.
 */
const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    const [amount, setAmount] = useState<string>("1");
    const [loading, setLoading] = useState(false);

    // Triggers Pi Network U2A payment flow
    const handleInvest = async () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return alert("Enter a valid amount");
        
        setLoading(true);
        try {
            await piService.invest(val);
            
            // Brief delay ensures backend processes the on-chain callback before UI refresh
            setTimeout(async () => {
                await onTransactionSuccess(); 
                alert(`Successfully invested ${val} π`);
            }, 1000);
        } catch (err) {
            alert("Transaction failed or cancelled");
        } finally {
            setLoading(false);
        }
    };

    // Requests A2U withdrawal back to user wallet
    const handleWithdraw = async () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return alert("Enter a valid withdrawal amount");

        setLoading(true);
        try {
            await piService.withdraw(val);
            await onTransactionSuccess(); 
            alert(`Withdrawal request for ${val} π submitted`);
        } catch (err) {
            alert("Withdrawal failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="actions-footer">
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1.0"
                disabled={loading}
            />
            <button onClick={handleInvest} disabled={loading}>
                {loading ? "Processing..." : "Invest Pi"}
            </button>
            <button className="btn-withdraw" onClick={handleWithdraw} disabled={loading}>
                Withdraw Pi
            </button>
        </div>
    );
};

export default ActionButtons;
