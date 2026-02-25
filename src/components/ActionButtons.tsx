import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

/**
 * Handles IPO investment and withdrawal actions.
 * Integrated with Pi SDK for on-chain transaction flows.
 */
const ActionButtons: React.FC = () => {
    const [amount, setAmount] = useState<number>(1.0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInvest = async () => {
        if (amount <= 0) return alert("Enter a valid amount");

        setIsProcessing(true);
        try {
            // Triggering Pi Network Sandbox payment flow
            await piService.invest(amount);
        } catch (error) {
            console.error("On-chain investment failed", error);
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
                onChange={(e) => setAmount(Number(e.target.value))} 
                disabled={isProcessing}
            />
            
            <button onClick={handleInvest} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Invest Pi"}
            </button>
            
            <button className="btn-withdraw" disabled={true}>
                Withdraw (A2U Ready)
            </button>
        </div>
    );
};

export default ActionButtons;
