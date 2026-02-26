import React, { useState } from 'react';
import { piService } from '../services/piService';

interface ActionProps {
    onTransactionSuccess: () => void;
}

/**
 * MapCap IPO Transaction Actions
 * Spec: Philip Jennings [Page 8]
 * Handles On-chain investment and A2U withdrawals.
 */
const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    const [investAmount, setInvestAmount] = useState<string>("1.00");
    const [withdrawPercent, setWithdrawPercent] = useState<string>("50");
    const [loading, setLoading] = useState<boolean>(false);

    const handleInvest = async () => {
        const val = parseFloat(investAmount);
        if (isNaN(val) || val <= 0) return alert("Invalid amount");
        
        setLoading(true);
        try {
            await piService.invest(val);
            setTimeout(async () => {
                await onTransactionSuccess();
                alert(`Success: ${val} π invested.`);
            }, 1500);
        } catch (err) {
            alert("Payment failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        const percent = parseFloat(withdrawPercent);
        if (isNaN(percent) || percent <= 0) return alert("Invalid percentage");

        setLoading(true);
        try {
            await piService.withdraw(percent);
            await onTransactionSuccess();
            alert(`Withdrawal of ${percent}% initiated.`);
        } catch (err) {
            alert("Withdrawal failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-4 w-full">
            {/* Invest Action Group */}
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handleInvest} 
                    disabled={loading}
                    className="flex-1 bg-[#007a33] text-white py-3 rounded-xl font-bold active:bg-green-900 disabled:opacity-50"
                >
                    {loading ? "..." : "Invest Pi"}
                </button>
                <input 
                    type="number" 
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-24 p-3 border border-gray-200 rounded-xl text-center font-bold text-[#007a33]"
                    disabled={loading}
                />
            </div>

            {/* Withdraw Action Group */}
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handleWithdraw} 
                    disabled={loading}
                    className="flex-1 bg-[#007a33] text-white py-3 rounded-xl font-bold active:bg-green-900 disabled:opacity-50"
                >
                    Withdraw Pi
                </button>
                <div className="relative">
                    <input 
                        type="number" 
                        value={withdrawPercent}
                        onChange={(e) => setWithdrawPercent(e.target.value)}
                        className="w-24 p-3 border border-gray-200 rounded-xl text-center font-bold text-[#007a33] pr-6"
                        disabled={loading}
                    />
                    <span className="absolute right-2 top-3 text-[#007a33] font-bold">%</span>
                </div>
            </div>
        </div>
    );
};

export default ActionButtons;
