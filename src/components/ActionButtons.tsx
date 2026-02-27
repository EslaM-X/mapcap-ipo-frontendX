import React, { useState } from 'react';
import { piService } from '../services/piService.ts';

interface ActionProps {
    onTransactionSuccess: () => void;
}

const ActionButtons: React.FC<ActionProps> = ({ onTransactionSuccess }) => {
    const [investAmount, setInvestAmount] = useState<string>("1");
    const [withdrawPercent, setWithdrawPercent] = useState<string>("10");
    const [loading, setLoading] = useState<boolean>(false);

    const handleInvest = async () => {
        const val = parseFloat(investAmount);
        if (isNaN(val) || val <= 0) return alert("Invalid amount.");
        setLoading(true);
        try {
            await piService.invest(val);
            setTimeout(async () => {
                await onTransactionSuccess();
                alert(`Confirmed: ${val} π added.`);
            }, 1500);
        } catch (err) {
            alert("Payment failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        const percent = parseFloat(withdrawPercent);
        if (isNaN(percent) || percent <= 0 || percent > 100) return alert("Enter 1-100.");
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

    // Style for the merged container to make input and button look like one unit
    const rowContainerStyle: React.CSSProperties = {
        display: 'flex',
        width: '100%',
        maxWidth: '380px',
        height: '55px',
        backgroundColor: '#ffffff',
        borderRadius: '15px', // Rounded corners for the whole unit
        border: '1.5px solid #bcbcbc',
        overflow: 'hidden', // Ensures the button and input don't spill out
        marginBottom: '15px'
    };

    const inputAreaStyle: React.CSSProperties = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px',
        position: 'relative'
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '18px',
        backgroundColor: 'transparent',
        color: '#555'
    };

    const buttonStyle: React.CSSProperties = {
        width: '130px',
        backgroundColor: '#315d43',
        color: '#f7e7b5',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 15px' }}>
            
            {/* Investment Row - Merged Design */}
            <div style={rowContainerStyle}>
                <div style={inputAreaStyle}>
                    <input 
                        type="number" 
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        style={inputStyle}
                        disabled={loading}
                    />
                    <span style={{ color: '#888', fontWeight: 'bold', marginLeft: '5px' }}>pi</span>
                </div>
                <button onClick={handleInvest} disabled={loading} style={buttonStyle}>
                    {loading ? "..." : "Invest pi"}
                </button>
            </div>

            {/* Withdrawal Row - Merged Design */}
            <div style={rowContainerStyle}>
                <div style={inputAreaStyle}>
                    <input 
                        type="number" 
                        value={withdrawPercent}
                        onChange={(e) => setWithdrawPercent(e.target.value)}
                        style={inputStyle}
                        disabled={loading}
                    />
                    <span style={{ color: '#888', fontWeight: 'bold', marginLeft: '5px' }}>%</span>
                </div>
                <button onClick={handleWithdraw} disabled={loading} style={buttonStyle}>
                    {loading ? "..." : "Withdraw pi"}
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
