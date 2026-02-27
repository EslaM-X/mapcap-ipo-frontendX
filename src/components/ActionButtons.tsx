import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

/**
 * ActionButtons Component
 * Provides UI controls for Pi Network on-chain investment and withdrawal.
 * Optimized for mobile touch targets and centered layout alignment.
 */
interface ActionProps {
    onTransactionSuccess: () => void;
}

const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    const [investAmount, setInvestAmount] = useState<string>("1.0");
    const [withdrawPercent, setWithdrawPercent] = useState<string>("50");
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Triggers the Pi SDK payment flow for IPO investment.
     * Ensures UI consistency after on-chain finality.
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
     * Executes the withdrawal request via the backend API.
     * Updates IPO statistics upon successful processing.
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
        /* Main Action Container: Flex-col with items-center for perfect centering */
        <div className="flex flex-col space-y-3 w-full items-center">
            
            {/* Investment Row: Input follows the design's left-to-right order */}
            <div className="flex items-center w-full max-w-[380px] space-x-2">
                <div className="relative flex-1 max-w-[120px]">
                    <input 
                        type="number" 
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        className="w-full p-3 border border-[#d1cfc8] rounded-[15px] text-center font-bold text-black bg-white outline-none"
                        disabled={loading}
                    />
                    <span className="absolute right-3 top-3.5 text-black font-bold text-[14px]">pi</span>
                </div>
                
                <button 
                    onClick={handleInvest} 
                    disabled={loading}
                    className="flex-1 bg-[#4d7c44] text-white py-3 rounded-[15px] font-bold text-[16px] active:scale-95 disabled:opacity-50 transition-all shadow-sm"
                >
                    {loading ? "..." : "Invest pi"}
                </button>
            </div>

            {/* Withdrawal Row: Mirroring the design's rounded input and button layout */}
            <div className="flex items-center w-full max-w-[380px] space-x-2">
                <div className="relative flex-1 max-w-[120px]">
                    <input 
                        type="number" 
                        value={withdrawPercent}
                        onChange={(e) => setWithdrawPercent(e.target.value)}
                        className="w-full p-3 border border-[#d1cfc8] rounded-[15px] text-center font-bold text-black bg-white outline-none"
                        disabled={loading}
                    />
                    <span className="absolute right-3 top-3.5 text-black font-bold text-[14px]">%</span>
                </div>

                <button 
                    onClick={handleWithdraw} 
                    disabled={loading}
                    className="flex-1 bg-[#4d7c44] text-white py-3 rounded-[15px] font-bold text-[16px] active:scale-95 disabled:opacity-50 transition-all shadow-sm"
                >
                    Withdraw pi
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
