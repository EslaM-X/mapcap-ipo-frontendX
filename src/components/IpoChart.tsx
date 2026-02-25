import React from 'react';

/**
 * Visual representation of MapCap daily spot-price.
 * Syncs with Week 1 - Week 4 timeline.
 */
const IpoChart: React.FC<{ data: any[] }> = ({ data }) => {
    return (
        <div className="chart-section">
            <h4>MapCap Spot-price</h4>
            {/* Placeholder for chart logic - simpler for mobile review */}
            <div className="chart-placeholder">
                {data.length > 0 ? "Graph rendering..." : "Calculating..."}
            </div>
        </div>
    );
};

export default IpoChart;

