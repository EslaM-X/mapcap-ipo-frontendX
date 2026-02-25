import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

/**
 * Custom CSS Chart for price trends.
 * Simple, high-performance, and lightweight.
 */
const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    // Default data for display if backend is empty
    const displayData = data.length > 0 ? data : [
        { day: 1, price: 0.350 },
        { day: 2, price: 0.400 },
        { day: 3, price: 0.436 }
    ];

    // Calculate dynamic height relative to the max price
    const maxPrice = Math.max(...displayData.map(d => d.price));

    return (
        <div className="chart-container">
            <h4 className="chart-title">MapCap Price Trend</h4>
            <div className="chart-bars">
                {displayData.map((item, index) => (
                    <div key={index} className="bar-wrapper">
                        <div 
                            className="bar" 
                            style={{ height: `${(item.price / maxPrice) * 100}%` }}
                        >
                            <span className="price-label">{item.price.toFixed(3)}</span>
                        </div>
                        <span className="day-label">D{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IpoChart;
