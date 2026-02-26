import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

interface ActionProps {
    onTransactionSuccess: () => void;
}

const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    const [amount, setAmount] = useState<string>("1");
    const [loading, setLoading] = useState(false);

    const handleInvest = async () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return alert("Enter a valid amount");
        
        setLoading(true);
        try {
            await piService.invest(val);
            // انتظر ثانية واحدة لضمان تحديث البيانات في الباك إند
            setTimeout(async () => {
                await onTransactionSuccess(); 
                alert(`Success! Invested ${val} π`);
            }, 1000);
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
            await onTransactionSuccess(); 
            alert(`Success! Requested ${val} Pi withdrawal.`);
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
                {loading ? "..." : "Invest Pi"}
            </button>
            <button className="btn-withdraw" onClick={handleWithdraw} disabled={loading}>
                Withdraw Pi
            </button>
        </div>
    );
};

export default ActionButtons;
