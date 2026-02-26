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
    
    // Formatting helper to match the clean numeric style in the reference image
    const formatPi = (value: number) => value.toLocaleString(undefined, { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 3 
    });

    return (
        <div className="w-full">
            {/* Using a clean list with specific colors from Map of Pi Palette */}
            <ul className="space-y-3">
                
                {/* Metric Item: Total Investors */}
                <li className="flex justify-between items-center border-b border-[#e5e7eb] pb-2">
                    <span className="text-gray-600 text-[13px] font-medium leading-relaxed">
                        Total investors to date:
                    </span>
                    <span className="font-bold text-gray-900 text-[14px]">
                        {totalInvestors.toLocaleString()}
                    </span>
                </li>
                
                {/* Metric Item: Total Pi Invested */}
                <li className="flex justify-between items-center border-b border-[#e5e7eb] pb-2">
                    <span className="text-gray-600 text-[13px] font-medium leading-relaxed">
                        Total pi invested to date:
                    </span>
                    <span className="font-bold text-gray-900 text-[14px]">
                        {formatPi(totalPiInvested)} <span className="text-[12px] font-normal">π</span>
                    </span>
                </li>

                {/* Metric Item: User's Personal Investment (On-chain Sync) */}
                <li className="flex justify-between items-center border-b border-[#e5e7eb] pb-2">
                    <span className="text-gray-600 text-[13px] font-medium leading-relaxed">
                        Your pi invested to date:
                    </span>
                    <span className="font-bold text-gray-900 text-[14px]">
                        {formatPi(userPiInvested)} <span className="text-[12px] font-normal">π</span>
                    </span>
                </li>

                {/* Metric Item: Capital Gain (Highlighted in Pi Green) */}
                <li className="flex justify-between items-center pt-1">
                    <span className="text-gray-600 text-[13px] font-medium leading-relaxed">
                        Your capital gain to date:
                    </span>
                    <span className="font-bold text-[#2e7d32] text-[14px]">
                        +{formatPi(capitalGain)} <span className="text-[12px] font-normal">π</span>
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default StatsBoard;
