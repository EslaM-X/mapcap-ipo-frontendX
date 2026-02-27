import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

/**
 * ActionButtons Component
 * Optimized with high-priority inline styling to ensure visual consistency
 * with the MapCap IPO design language.
 */
interface ActionProps {
    onTransactionSuccess: () => void;
}

const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    const [investAmount, setInvestAmount] = useState<string>("1.0");
    const [withdrawPercent, setWithdrawPercent] = useState<string>("50");
    const [loading, setLoading] = useState<boolean>(false);

    // Business Logic remains untouched for backend stability
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

    const handleWithdraw = async () => {
        const percent = parseFloat(withdrawPercent);
        if (isNaN(percent) || percent <= 0 || percent > 100) return alert("Enter percentage (1-100).");
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

    // Shared styles to match reference
    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 15px',
        border: '1.5px solid #bcbcbc',
        borderRadius: '12px',
        backgroundColor: '#f9f8f4',
        fontSize: '16px',
        color: '#555',
        outline: 'none',
        textAlign: 'left'
    };

    const buttonStyle: React.CSSProperties = {
        width: '140px',
        backgroundColor: '#315d43',
        color: '#f7e7b5',
        padding: '12px 0',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', alignItems: 'center', padding: '10px 20px' }}>
            
            {/* Investment Row */}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '400px', gap: '10px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input 
                        type="number" 
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        style={inputStyle}
                        disabled={loading}
                    />
                    <span style={{ position: 'absolute', right: '15px', top: '12px', color: '#888', fontWeight: 'bold' }}>pi</span>
                </div>
                <button 
                    onClick={handleInvest} 
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading ? "..." : "Invest pi"}
                </button>
            </div>

            {/* Withdrawal Row */}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '400px', gap: '10px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input 
                        type="number" 
                        value={withdrawPercent}
                        onChange={(e) => setWithdrawPercent(e.target.value)}
                        style={inputStyle}
                        disabled={loading}
                    />
                    <span style={{ position: 'absolute', right: '15px', top: '12px', color: '#888', fontWeight: 'bold' }}>%</span>
                </div>
                <button 
                    onClick={handleWithdraw} 
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading ? "..." : "Withdraw pi"}
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
