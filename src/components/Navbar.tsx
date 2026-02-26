import React from 'react';
import './Navbar.css';

interface NavbarProps {
  username?: string;
  onRefresh: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onRefresh }) => {
  
  const handleHelp = (): void => {
    window.open("https://mapofpi.zapier.app", "_blank", "noopener, noreferrer");
  };

  return (
    <nav className="navbar-main">
      {/* 1. Top Section: Brand Title */}
      <div className="nav-brand-area">
        <h1 className="nav-title">
          {username ? `MapCapIPO - @${username}` : "Map of Pi"}
        </h1>
      </div>

      {/* 2. Bottom Section: Horizontal Icons Row - THE CRITICAL FIX */}
      <div className="nav-icons-row">
        {/* Back Arrow */}
        <button className="nav-item opacity-40">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Home/Refresh Icon */}
        <button className="nav-item" onClick={() => window.location.href='/'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        {/* Central Pi Identity Pin - Matches 1000303277.png */}
        <div className="pi-pin-container">
          <div className="pi-pin-marker">
            <span className="pi-symbol">π</span>
          </div>
        </div>

        {/* Support/Help */}
        <button className="nav-item" onClick={handleHelp}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Menu Icon */}
        <button className="nav-item" onClick={onRefresh}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
