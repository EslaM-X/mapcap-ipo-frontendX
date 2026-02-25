import React from 'react';

interface StatsProps {
    totalInvestors: number;
    totalPiInvested: number;
    userPiBalance: number;
    spotPrice: number;
}

/**
 * Displays IPO metrics with simple, readable lists.
 */
const StatsBoard: React.FC<StatsProps> = ({ totalInvestors, totalPiInvested, userPiBalance, spotPrice }) => {
    // Safe calculation to prevent NaN during initial load
    const balance = userPiBalance || 0;
    const currentPrice = spotPrice || 0.35;
    const initialPrice = 0.35;
    
    const capitalGain = balance > 0 
        ? ((currentPrice - initialPrice) / initialPrice * 100).toFixed(2)
        : "0.00";

    return (
        <div className="stats-container">
            <h3 style={{ color: '#2e7d32', fontSize: '16px' }}>IPO Metrics:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>👥 Investors: <b>{totalInvestors || 0}</b></li>
                <li>💰 Total Invested: <b>{totalPiInvested || 0} π</b></li>
                <li>👤 Your Investment: <b>{balance} π</b></li>
                <li>📈 Est. Capital Gain: <b style={{ color: '#2e7d32' }}>+{capitalGain}%</b></li>
            </ul>
        </div>
    );
};

export default StatsBoard;
