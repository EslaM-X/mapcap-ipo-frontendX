import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

interface ActionProps {
    onTransactionSuccess: () => void;
}

/**
 * Dashboard controls for investing and withdrawing Pi.
 */
const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    const [amount, setAmount] = useState<number>(1.0);
    const [loading, setLoading] = useState(false);

    const handleInvest = async () => {
        if (amount <= 0) return alert("Enter a valid amount");
        setLoading(true);
        try {
            await piService.invest(amount);
            onTransactionSuccess();
        } catch (err) {
            alert("Investment error");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        if (amount <= 0) return alert("Enter amount to withdraw");
        setLoading(true);
        try {
            await piService.withdraw(amount);
            onTransactionSuccess();
            alert(`Success! Requested ${amount} Pi withdrawal.`);
        } catch (err) {
            alert("Withdrawal failed. Check balance.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="actions-footer">
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))} 
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
