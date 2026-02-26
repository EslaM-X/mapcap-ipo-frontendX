import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

interface ActionProps {
    onTransactionSuccess: () => void;
}

/**
 * Enhanced controls for MapCap transactions.
 * Fixes input zero-locking and triggers UI-wide metrics refresh.
 */
const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    // Initialize as string to allow empty input and prevent "0" locking
    const [amount, setAmount] = useState<string>("1");
    const [loading, setLoading] = useState(false);

    const handleInvest = async () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return alert("Enter a valid amount");
        
        setLoading(true);
        try {
            await piService.invest(val);
            alert(`Success! Invested ${val} Pi.`);
            onTransactionSuccess(); // Refreshes stats and chart points
        } catch (err) {
            alert("Investment failed");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return alert("Enter amount to withdraw");

        setLoading(true);
        try {
            await piService.withdraw(val);
            alert(`Success! Requested ${val} Pi withdrawal.`);
            onTransactionSuccess(); // Updates "Your Investment" and total metrics
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
                onChange={(e) => setAmount(e.target.value)} // String input prevents "0" issues
                placeholder="1.0"
                disabled={loading}
            />
            
            <button onClick={handleInvest} disabled={loading}>
                {loading ? "..." : "Invest Pi"}
            </button>
            
            <button className="btn-withdraw" onClick={handleWithdraw} disabled={loading}>
                Withdraw Pi
            </button>
        </div>
    );
};

export default ActionButtons;
