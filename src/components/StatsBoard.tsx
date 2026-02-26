import React from 'react';

const StatsBoard: React.FC = () => {
  return (
    <div className="w-full px-4 py-2 bg-[#f4f1ea]">
      <div className="w-full border border-gray-300 rounded-[30px] p-6 bg-[#f4f1ea]">
        <h3 className="text-black font-bold text-[16px] mb-4">MapCap IPO Statistics:</h3>
        <ul className="space-y-3">
          {[
            "Total investors to date: 125",
            "Total pi invested to date: 4,850.00 π",
            "Your pi invested to date: 50.00 π",
            "Your capital gain to date: +445.269 π"
          ].map((text, i) => (
            <li key={i} className="flex items-start text-black text-[14px]">
              <span className="mr-3 text-[18px] leading-none">•</span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default StatsBoard;
