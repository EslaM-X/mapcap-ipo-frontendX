import React from 'react';

// تعريف الـ Props عشان نربطها بالـ SDK لاحقاً
interface StatsBoardProps {
  totalInvestors?: number;
  totalPiPool?: number;
  userStake?: number;
  capitalGain?: number;
}

const StatsBoard: React.FC<StatsBoardProps> = ({ 
  totalInvestors = 125, 
  totalPiPool = 4850.00, 
  userStake = 50.00, 
  capitalGain = 445.269 
}) => {
  return (
    <div className="w-full px-4 py-2 bg-[#f4f1ea]">
      <div className="w-full border border-gray-300 rounded-[25px] p-6 bg-white shadow-sm">
        <h3 className="text-black font-bold text-[17px] mb-4 border-b pb-2 border-gray-100">
          MapCap IPO Statistics:
        </h3>
        
        <ul className="space-y-4">
          <li className="flex items-center text-black text-[15px]">
            <span className="text-[#007a33] mr-3 font-bold">•</span>
            Total investors to date: <strong className="ml-1">{totalInvestors}</strong>
          </li>
          
          <li className="flex items-center text-black text-[15px]">
            <span className="text-[#007a33] mr-3 font-bold">•</span>
            Total pi invested to date: <strong className="ml-1">{totalPiPool.toLocaleString()} π</strong>
          </li>
          
          <li className="flex items-center text-black text-[15px]">
            <span className="text-[#007a33] mr-3 font-bold">•</span>
            Your pi invested to date: <strong className="ml-1">{userStake.toLocaleString()} π</strong>
          </li>
          
          <li className="flex items-center text-black text-[15px]">
            <span className="text-[#007a33] mr-3 font-bold">•</span>
            Your capital gain to date: 
            <strong className="ml-1 text-[#007a33]">+{capitalGain.toLocaleString()} π</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StatsBoard;
