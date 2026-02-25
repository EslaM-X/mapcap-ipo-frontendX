// Core data structures based on MapCapIPO specs
export interface MapCapData {
    totalInvestors: number;     // Unique pioneers participated
    totalPiInvested: number;    // Aggregate Pi in IPO wallet
    userPiBalance: number;      // Current user's contribution
    spotPrice: number;          // IPO MapCap / Wallet balance
}

