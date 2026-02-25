import React from 'react';
import { MapCapData } from '../types/ipo';

/**
 * Dashboard stats component.
 * Displays aggregate IPO data and user-specific balance.
 */
const StatsBoard: React.FC<MapCapData> = ({ totalInvestors, totalPiInvested, userPiBalance, spotPrice }) => {
    return (
        <div className="stats-container">
            <h3>MapCap IPO Statistics:</h3>
            <ul>
                <li>Total investors to date: {totalInvestors}</li>
                <li>Total pi invested to date: {totalPiInvested} π</li>
                <li>Your pi invested to date: {userPiBalance} π</li>
                {/* 20% capital gain as per Section 3 of Use Case */}
                <li>Your capital gain to date: {(userPiBalance * 1.2).toFixed(2)} π</li>
            </ul>
        </div>
    );
};

export default StatsBoard;

