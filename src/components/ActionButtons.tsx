import React, { useState } from 'react';
import { piService } from '../services/piService';

interface ActionProps {
    onTransactionSuccess: () => void;
}

const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    const [investAmount, setInvestAmount] = useState<string>("1.00");
    const [withdrawPercent, setWithdrawPercent] = useState<string>("50");
    const [loading, setLoading] = useState<boolean>(false);

    // Executes On-chain payment flow via Pi SDK
    const handleInvest = async () => {
        const val = parseFloat(investAmount);
        if (isNaN(val) || val <= 0) return alert("Please enter a valid amount.");
        
        setLoading(true);
        try {
            await piService.invest(val);
            setTimeout(async () => {
                await onTransactionSuccess();
                alert(`Transaction confirmed: ${val} π added to IPO.`);
            }, 1500);
        } catch (err) {
            alert("Payment process aborted.");
        } finally {
            setLoading(false);
        }
    };

    // Relays withdrawal request to Backend API
    const handleWithdraw = async () => {
        const percent = parseFloat(withdrawPercent);
        if (isNaN(percent) || percent <= 0 || percent > 100) {
            return alert("Enter a valid percentage (1-100).");
        }

        setLoading(true);
        try {
            await piService.withdraw(percent);
            await onTransactionSuccess();
            alert(`Withdrawal request for ${percent}% sent successfully.`);
        } catch (err) {
            alert("Withdrawal failed. Check your balance.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-4 w-full">
            {/* Investment Control Group */}
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handleInvest} 
                    disabled={loading}
                    className="flex-1 bg-[#007a33] text-white py-3 rounded-xl font-bold active:bg-green-900 disabled:opacity-50 transition-colors"
                >
                    {loading ? "Processing..." : "Invest Pi"}
                </button>
                <input 
                    type="number" 
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-24 p-3 border border-gray-200 rounded-xl text-center font-bold text-[#007a33] outline-none"
                    disabled={loading}
                />
            </div>

            {/* Withdrawal Control Group */}
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handleWithdraw} 
                    disabled={loading}
                    className="flex-1 bg-[#007a33] text-white py-3 rounded-xl font-bold active:bg-green-900 disabled:opacity-50 transition-colors"
                >
                    Withdraw Pi
                </button>
                <div className="relative">
                    <input 
                        type="number" 
                        value={withdrawPercent}
                        onChange={(e) => setWithdrawPercent(e.target.value)}
                        className="w-24 p-3 border border-gray-200 rounded-xl text-center font-bold text-[#007a33] pr-6 outline-none"
                        disabled={loading}
                    />
                    <span className="absolute right-2 top-3 text-[#007a33] font-bold">%</span>
                </div>
            </div>
        </div>
    );
};

export default ActionButtons;
