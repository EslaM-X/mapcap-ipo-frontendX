import React from 'react';

interface StatsProps {
    totalInvestors: number;
    totalPiInvested: number;
    userPiInvested: number;
    capitalGain: number;
}

const StatsBoard: React.FC<StatsProps> = ({ 
    totalInvestors = 0, 
    totalPiInvested = 0, 
    userPiInvested = 0, 
    capitalGain = 0 
}) => {
    
    // Formatting helper for localized numeric display
    const formatPi = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2 });

    return (
        <div className="space-y-3">
            <ul className="space-y-4 text-[#333] text-sm md:text-base">
                {/* Global Ecosystem Metrics */}
                <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span>Total investors to date:</span>
                    <span className="font-bold text-gray-800">{totalInvestors.toLocaleString()}</span>
                </li>
                
                <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span>Total pi invested to date:</span>
                    <span className="font-bold text-gray-800">{formatPi(totalPiInvested)} π</span>
                </li>

                {/* Individual User Metrics (On-chain Sync) */}
                <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span>Your pi invested to date:</span>
                    <span className="font-bold text-gray-800">{formatPi(userPiInvested)} π</span>
                </li>

                <li className="flex justify-between items-center">
                    <span>Your capital gain to date:</span>
                    <span className="font-bold text-[#007a33]">+{formatPi(capitalGain)} π</span>
                </li>
            </ul>
        </div>
    );
};

export default StatsBoard;
