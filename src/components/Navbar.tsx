import React from 'react';

interface NavbarProps {
  username?: string;
  onRefresh: () => void;
}

/**
 * MapCapIPO Navbar - TypeScript Version
 * Built to Philip Jennings' branding specs [Page 8]
 */
const Navbar: React.FC<NavbarProps> = ({ username, onRefresh }) => {
  
  const handleHelp = (): void => {
    window.open("https://chatwithmac.com", "_blank");
  };

  return (
    <nav className="bg-[#007a33] p-3 flex flex-col items-center shadow-md w-full">
      {/* App Branding & User context */}
      <div className="text-[#ffd700] font-bold text-lg mb-2 tracking-wide">
        MapCapIPO {username ? `- @${username}` : 'app'}
      </div>

      {/* Standardized Navigation Icons */}
      <div className="flex justify-between w-full max-w-sm px-4 items-center">
        
        {/* Navigation (Disabled per spec UI) */}
        <button className="text-[#ffd700] text-2xl opacity-40 cursor-not-allowed">←</button>
        <button className="text-[#ffd700] text-2xl opacity-40 cursor-not-allowed">🏠</button>

        {/* Central Pi Identity */}
        <div className="bg-[#007a33] border-2 border-[#ffd700] rounded-full w-12 h-12 flex items-center justify-center shadow-inner">
          <span className="text-[#ffd700] font-bold text-2xl">π</span>
        </div>

        {/* Functional Icons */}
        <button 
          onClick={handleHelp} 
          className="text-[#ffd700] text-2xl hover:scale-110 transition-transform"
          aria-label="Help"
        >
          ❓
        </button>
        <button 
          onClick={onRefresh} 
          className="text-[#ffd700] text-2xl hover:rotate-180 transition-transform duration-500"
          aria-label="Refresh"
        >
          ↻
        </button>

      </div>
    </nav>
  );
};

export default Navbar;

