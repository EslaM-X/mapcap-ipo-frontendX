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
    <nav className="bg-[#007a33] shadow-md w-full">
      {/* Upper Section: Brand and Context */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-green-800">
        <button className="text-white text-xl opacity-50 cursor-not-allowed">←</button>
        
        <div className="flex items-center space-x-2">
          <span className="text-[#ffd700] font-extrabold text-lg tracking-tight uppercase">
            MapCap IPO
          </span>
          {username && (
            <span className="text-white text-xs opacity-80 font-medium">
              @{username}
            </span>
          )}
        </div>

        <button className="text-white text-xl opacity-50 cursor-not-allowed">⌄</button>
      </div>

      {/* Main Navigation: Replicating Map of Pi layout */}
      <div className="flex justify-around items-center py-2 bg-[#005c26]">
        {/* Navigation buttons maintaining same functionality */}
        <button className="text-gray-300 opacity-40 cursor-not-allowed">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        </button>

        {/* Central Pi Identity Anchor */}
        <div className="relative group">
            <div className="bg-[#007a33] border-2 border-[#ffd700] rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                <span className="text-[#ffd700] font-bold text-xl">π</span>
            </div>
            {/* Active notification indicator */}
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border border-white"></div>
        </div>

        {/* Support and Refresh Actions */}
        <button 
          onClick={handleHelp} 
          className="text-[#ffd700] hover:scale-110 transition-transform p-1 border border-[#ffd700] rounded-full"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>

        <button 
          onClick={onRefresh} 
          className="text-gray-300 hover:text-white transition-colors p-1"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
