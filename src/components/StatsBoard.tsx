import React from 'react';

interface StatsProps {
    totalInvestors: number;
    totalPiInvested: number;
    userPiBalance: number;
    spotPrice: number;
}

/**
 * Renders IPO metrics in a clean, card-based layout.
 * Optimized for real-time reactivity during Invest/Withdraw actions.
 */
const StatsBoard: React.FC<StatsProps> = ({ 
    totalInvestors, 
    totalPiInvested, 
    userPiBalance, 
    spotPrice 
}) => {
    
    // Core logic for gains based on spot price movement
    const initialPrice = 0.35;
    const currentPrice = spotPrice || initialPrice;
    
    const capitalGain = userPiBalance > 0 
        ? ((currentPrice - initialPrice) / initialPrice * 100).toFixed(2)
        : "0.00";

    return (
        <div className="stats-card">
            <h3 className="stats-header">MapCap IPO Statistics:</h3>
            <ul className="stats-list">
                <li>Total investors to date: <b>{totalInvestors.toLocaleString()}</b></li>
                <li>Total pi invested to date: <b>{totalPiInvested.toLocaleString()} π</b></li>
                <li>Your pi invested to date: <b>{userPiBalance.toLocaleString()} π</b></li>
                <li>Your capital gain to date: <span className="gain-text">+{capitalGain}%</span></li>
            </ul>
        </div>
    );
};

export default StatsBoard;
