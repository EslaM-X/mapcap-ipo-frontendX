import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

/**
 * ActionButtons Component
 * * Purpose: Manages the investment and withdrawal interactions within the Pi ecosystem.
 * Design: Matches the exact visual specifications from reference,
 * featuring rounded corners, soft borders, and the signature forest green action buttons.
 */
interface ActionProps {
    onTransactionSuccess: () => void;
}

const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    // State management for input values - keeping original logic intact
    const [investAmount, setInvestAmount] = useState<string>("1.0");
    const [withdrawPercent, setWithdrawPercent] = useState<string>("50");
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Executes the investment flow via Pi SDK.
     * Maintains original function signature and logic for backend compatibility.
     */
    const handleInvest = async () => {
        const val = parseFloat(investAmount);
        if (isNaN(val) || val <= 0) return alert("Invalid amount.");
        
        setLoading(true);
        try {
            await piService.invest(val);
            setTimeout(async () => {
                await onTransactionSuccess();
                alert(`Confirmed: ${val} π added to IPO.`);
            }, 1500);
        } catch (err) {
            alert("Payment cancelled or failed.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Executes the withdrawal flow via backend API.
     * Optimized for MERN stack integration without breaking existing endpoints.
     */
    const handleWithdraw = async () => {
        const percent = parseFloat(withdrawPercent);
        if (isNaN(percent) || percent <= 0 || percent > 100) {
            return alert("Enter percentage (1-100).");
        }

        setLoading(true);
        try {
            await piService.withdraw(percent);
            await onTransactionSuccess();
            alert(`Withdrawal of ${percent}% processed.`);
        } catch (err) {
            alert("Withdrawal failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        /* UI Container: Uses flex-col for mobile-first vertical stacking */
        <div className="flex flex-col space-y-4 w-full items-center px-4 mt-2">
            
            {/* Investment Section: Input and Button grouped horizontally */}
            <div className="flex items-center w-full max-w-[400px] space-x-3">
                {/* Numeric Input: Styled with soft borders and rounded corners per */}
                <div className="relative flex-1">
                    <input 
                        type="number" 
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        className="w-full p-3.5 border-2 border-[#bcbcbc] rounded-[18px] text-left pl-5 font-medium text-gray-600 bg-[#f9f8f4] outline-none transition-all focus:border-gray-400"
                        disabled={loading}
                    />
                    <span className="absolute right-5 top-4 text-gray-500 font-medium text-[16px]">pi</span>
                </div>
                
                {/* Action Button: Signature green with gold-ish text as seen in reference */}
                <button 
                    onClick={handleInvest} 
                    disabled={loading}
                    className="w-[140px] bg-[#315d43] text-[#f7e7b5] py-3.5 rounded-[18px] font-bold text-[17px] active:scale-95 disabled:opacity-70 transition-all shadow-sm flex justify-center items-center"
                >
                    {loading ? "..." : "Invest pi"}
                </button>
            </div>

            {/* Withdrawal Section: Mirrors Investment styling for visual consistency */}
            <div className="flex items-center w-full max-w-[400px] space-x-3">
                <div className="relative flex-1">
                    <input 
                        type="number" 
                        value={withdrawPercent}
                        onChange={(e) => setWithdrawPercent(e.target.value)}
                        className="w-full p-3.5 border-2 border-[#bcbcbc] rounded-[18px] text-left pl-5 font-medium text-gray-600 bg-[#f9f8f4] outline-none transition-all focus:border-gray-400"
                        disabled={loading}
                    />
                    <span className="absolute right-5 top-4 text-gray-500 font-medium text-[16px]">%</span>
                </div>

                <button 
                    onClick={handleWithdraw} 
                    disabled={loading}
                    className="w-[140px] bg-[#315d43] text-[#f7e7b5] py-3.5 rounded-[18px] font-bold text-[17px] active:scale-95 disabled:opacity-70 transition-all shadow-sm flex justify-center items-center"
                >
                    {loading ? "..." : "Withdraw pi"}
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
