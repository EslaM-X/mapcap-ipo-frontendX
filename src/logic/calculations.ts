/**
 * Calculates Spot Price as per Use Case Page 4.
 * Formula: Total IPO MapCap (2,181,818) / Current Wallet Balance
 */
export const calculateSpotPrice = (totalPi: number): number => {
    const TOTAL_IPO_MAPCAP = 2181818; 
    return totalPi > 0 ? TOTAL_IPO_MAPCAP / totalPi : 0;
};

/**
 * 20% Capital Gain as defined in Section 1.
 */
export const getCapitalGain = (investment: number): number => {
    return investment * 1.20;
};

