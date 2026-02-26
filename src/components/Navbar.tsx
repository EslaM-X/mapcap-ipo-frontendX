import React from 'react';
// Binding the custom CSS for layout consistency and interaction effects
import './Navbar.css';

interface NavbarProps {
  username?: string;
  onRefresh: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onRefresh }) => {
  
  // Direct link to the official support channel
  const handleHelp = (): void => {
    window.open("https://mapofpi.zapier.app", "_blank", "noopener, noreferrer");
  };

  return (
    <nav className="w-full h-[76.19px] z-[500] px-[16px] py-[5px] bg-[#007a33] fixed top-0 left-0 right-0 shadow-lg">
      
      {/* Brand Identity Section - Mimicking Map of Pi Header Logic */}
      <div className="w-full flex justify-between items-center mb-1">
        <div className="flex-1" />
        <div className="text-center text-[#ffd700] text-[1.3rem] whitespace-nowrap flex-1 font-bold tracking-tight">
          {username ? `MapCapIPO - @${username}` : "MapCap IPO"}
        </div>
        <div className="flex-1 flex justify-end">
           {/* Visual badge for the IPO ecosystem context */}
           <div className="w-8 h-8 rounded-full bg-[#005c26] border border-[#ffd700] flex items-center justify-center text-[#ffd700] text-[10px] font-bold">
             IPO
           </div>
        </div>
      </div>

      {/* Navigation Icons Section - Utilizing shared CSS classes for consistency */}
      <div className="flex justify-between items-center px-2">
        {/* Back navigation placeholder */}
        <div className="nav-item cursor-pointer text-white opacity-40">
           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
        </div>

        {/* Global Dashboard Refresh - On-chain Sync */}
        <div className="nav-item cursor-pointer text-[#ffd700]" onClick={onRefresh}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>

        {/* Main Pi Anchor Identity */}
        <div className="nav-item disabled">
          <div className="relative border-2 border-[#ffd700] rounded-full p-1 bg-[#005c26]">
            <span className="text-[#ffd700] font-bold text-xl px-1">π</span>
          </div>
        </div>

        {/* Support Access */}
        <div className="nav-item cursor-pointer text-[#ffd700]" onClick={handleHelp}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Menu Context with active notification state */}
        <div className="nav-item cursor-pointer text-[#ffd700] relative">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white opacity-80">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-[#007a33]" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
