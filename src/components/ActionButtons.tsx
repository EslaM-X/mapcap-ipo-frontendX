import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

interface ActionButtonsProps {
    onTransactionSuccess: () => void;
}

/**
 * UI Controls for IPO actions.
 * Directly triggers on-chain investment via Pi SDK.
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({ onTransactionSuccess }) => {
    const [amount, setAmount] = useState<number>(1.0);
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * Executes investment and triggers dashboard refresh on success.
     */
    const handleInvest = async () => {
        if (amount <= 0) return alert("Enter a valid amount");

        setIsProcessing(true);
        try {
            await piService.invest(amount);
            onTransactionSuccess(); // Refresh charts and stats
            alert(`Success! Invested ${amount} Pi.`);
        } catch (error) {
            console.error("On-chain action failed", error);
            alert("Transaction error. See console for details.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="actions-footer">
            <input 
                type="number" 
                value={amount} 
                step="0.1"
                min="0.1"
                onChange={(e) => setAmount(Number(e.target.value))} 
                disabled={isProcessing}
            />
            
            <button 
                onClick={handleInvest} 
                disabled={isProcessing}
            >
                {isProcessing ? "Processing..." : "Invest Pi"}
            </button>
            
            <button className="btn-withdraw" disabled={true}>
                Withdraw (Locked)
            </button>
        </div>
    );
};

export default ActionButtons;
