import React from 'react';

interface NavbarProps {
  username?: string;
  onRefresh: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onRefresh }) => {
  
  const handleHelp = (): void => {
    window.open("https://chatwithmac.com", "_blank");
  };

  return (
    <nav className="bg-[#007a33] p-3 flex flex-col items-center shadow-md w-full">
      {/* Brand Identity & User Context */}
      <div className="text-[#ffd700] font-bold text-lg mb-2 tracking-wide">
        MapCapIPO {username ? `- @${username}` : 'app'}
      </div>

      {/* Navigation & Action Elements */}
      <div className="flex justify-between w-full max-w-sm px-4 items-center">
        
        {/* Navigation - Reserved for Future Scaling */}
        <button className="text-[#ffd700] text-2xl opacity-40 cursor-not-allowed">←</button>
        <button className="text-[#ffd700] text-2xl opacity-40 cursor-not-allowed">🏠</button>

        {/* Core Pi Symbol - Visual Anchor */}
        <div className="bg-[#007a33] border-2 border-[#ffd700] rounded-full w-12 h-12 flex items-center justify-center shadow-inner">
          <span className="text-[#ffd700] font-bold text-2xl">π</span>
        </div>

        {/* Interaction: Help & Sync */}
        <button 
          onClick={handleHelp} 
          className="text-[#ffd700] text-2xl hover:scale-110 transition-transform"
        >
          ❓
        </button>
        <button 
          onClick={onRefresh} 
          className="text-[#ffd700] text-2xl hover:rotate-180 transition-transform duration-500"
        >
          ↻
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
