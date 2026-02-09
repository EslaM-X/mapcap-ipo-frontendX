/**
 * MapCap IPO Context Provider
 * Architected by Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Manages global state for Pi Auth, IPO Metrics, and real-time syncing.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getIpoMetrics } from '../services/api.service';
import { PiService } from '../services/pi.service';

const IpoContext = createContext();

export const IpoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [metrics, setMetrics] = useState({
    totalInvestors: 0,
    totalPi: 0,
    userPi: 0,
    dailyPrices: []
  });
  const [loading, setLoading] = useState(true);

  // Function to refresh all data from MERN backend
  const refreshData = async (username) => {
    try {
      const data = await getIpoMetrics(username || currentUser?.username);
      setMetrics(data);
    } catch (err) {
      console.error("Context Sync Error:", err);
    }
  };

  return (
    <IpoContext.Provider value={{ 
      currentUser, setCurrentUser, 
      metrics, setMetrics, 
      loading, setLoading,
      refreshData 
    }}>
      {children}
    </IpoContext.Provider>
  );
};

// Custom Hook for easy access to MapCap data
export const useIpo = () => useContext(IpoContext);
