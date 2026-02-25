import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

/**
 * Interface for ActionButtons props.
 * Allows parent component to trigger data refresh on success.
 */
interface ActionButtonsProps {
    onTransactionSuccess: () => void;
}

/**
 * Handles IPO investments. 
 * Bridges UI interaction with Pi Network on-chain logic.
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({ onTransactionSuccess }) => {
    const [amount, setAmount] = useState<number>(1.0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInvest = async () => {
        if (amount <= 0) return alert("Enter a valid amount");

        setIsProcessing(true);
        try {
            // Step 1: Execute on-chain payment via service
            await piService.invest(amount);
            
            // Step 2: Notify parent to refresh Dashboard (Charts/Stats)
            onTransactionSuccess();
            
            alert(`Success! Invested ${amount} Pi.`);
        } catch (error) {
            console.error("On-chain flow failed", error);
            alert("Transaction failed. Check console.");
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
                Withdraw (Soon)
            </button>
        </div>
    );
};

export default ActionButtons;
