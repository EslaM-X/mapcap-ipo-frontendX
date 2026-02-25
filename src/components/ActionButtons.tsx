import React, { useState } from 'react';
import { initiateInvestment } from '../services/piService';

/**
 * Invest and Withdraw interface.
 * Handles U2A and A2U transaction triggers.
 */
const ActionButtons = () => {
    const [amount, setAmount] = useState<number>(1.0);

    return (
        <div className="actions-footer">
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))} 
            />
            <button onClick={() => initiateInvestment(amount)}>
                Invest pi
            </button>
            
            {/* Withdraw uses EscrowPi A2UaaS as per Use Case Page 5 */}
            <button className="btn-withdraw">
                Withdraw pi
            </button>
        </div>
    );
};

