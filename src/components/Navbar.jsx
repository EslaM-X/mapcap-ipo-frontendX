import React from 'react';

/**
 * MapCapIPO Navbar
 * Aligned with Philip Jennings' spec [Page 8] and Map-of-Pi branding.
 */
const Navbar = ({ username, onRefresh }) => {
  
  const handleHelp = () => window.open("https://chatwithmac.com", "_blank");

  return (
    <nav className="bg-[#007a33] p-3 flex flex-col items-center shadow-md">
      {/* App Title - Requirement [Page 8] */}
      <div className="text-[#ffd700] font-bold text-lg mb-2">
        MapCapIPO {username ? `- @${username}` : 'app'}
      </div>

      {/* Navigation Icons - Horizontal Spread */}
      <div className="flex justify-between w-full max-w-xs items-center">
        
        {/* Navigational Icons (Gold) */}
        <button className="text-[#ffd700] text-xl opacity-50 cursor-not-allowed">←</button>
        <button className="text-[#ffd700] text-xl opacity-50 cursor-not-allowed">🏠</button>

        {/* Center: Pi Branding */}
        <div className="bg-[#007a33] border-2 border-[#ffd700] rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-[#ffd700] font-bold text-xl">π</span>
        </div>

        {/* Action Icons */}
        <button onClick={handleHelp} className="text-[#ffd700] text-xl hover:scale-110">❓</button>
        <button onClick={onRefresh} className="text-[#ffd700] text-xl hover:rotate-180 transition-transform">↻</button>

      </div>
    </nav>
  );
};

export default Navbar;
