import React from 'react';

const StatsBoard: React.FC = () => {
  return (
    <div className="w-full px-4 py-2 bg-[#f4f1ea]">
      <div className="w-full border border-gray-300 rounded-[30px] p-6 bg-[#f4f1ea] shadow-sm">
        <h3 className="text-black font-bold text-[18px] mb-5 text-center">
          MapCap IPO Statistics
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Total Investors */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] uppercase font-bold ml-1">Total Investors</span>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 mt-1">
              <span className="text-black font-bold text-[16px]">125</span>
            </div>
          </div>

          {/* Total Pi Pool */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] uppercase font-bold ml-1">Total Pool</span>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 mt-1">
              <span className="text-[#007a33] font-bold text-[16px]">4,850.00 π</span>
            </div>
          </div>

          {/* Your Investment */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] uppercase font-bold ml-1">Your Stake</span>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 mt-1">
              <span className="text-black font-bold text-[16px]">50.00 π</span>
            </div>
          </div>

          {/* Capital Gain - الربح */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] uppercase font-bold ml-1">Net Gain</span>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-3 mt-1">
              <span className="text-[#007a33] font-bold text-[16px]">+445.269 π</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBoard;
