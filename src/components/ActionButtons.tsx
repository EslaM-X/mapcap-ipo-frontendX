import React, { useState } from 'react';
import { initiateInvestment } from '../services/piService';

/**
 * Invest and Withdraw interface.
 * Handles U2A and A2U transaction triggers with loading states.
 */
const ActionButtons = () => {
    const [amount, setAmount] = useState<number>(1.0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInvest = async () => {
        if (amount <= 0) return alert("Please enter a valid amount");

        setIsProcessing(true);
        try {
            // This triggers the Pi SDK payment flow
            await initiateInvestment(amount);
        } catch (error) {
            console.error("Investment flow failed", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="actions-footer">
            <input 
                type="number" 
                value={amount} 
                min="0.1"
                step="0.1"
                onChange={(e) => setAmount(Number(e.target.value))} 
                disabled={isProcessing}
            />
            
            <button 
                onClick={handleInvest} 
                disabled={isProcessing}
                style={{ opacity: isProcessing ? 0.6 : 1 }}
            >
                {isProcessing ? "Processing..." : "Invest pi"}
            </button>
            
            {/* Withdraw logic - Reserved for A2UaaS (Page 5) */}
            <button className="btn-withdraw" disabled={isProcessing}>
                Withdraw pi
            </button>
        </div>
    );
};

export default ActionButtons;
