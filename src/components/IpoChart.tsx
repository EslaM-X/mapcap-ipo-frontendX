import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

/**
 * Renders price trends using dynamic CSS heights.
 * Minimalist and performant for the Pi Browser environment.
 */
const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    // Fallback data to keep the UI "alive" if the backend is fetching
    const displayData = data && data.length > 0 ? data : [
        { day: 1, price: 0.350 },
        { day: 2, price: 0.410 },
        { day: 3, price: 0.436 }
    ];

    const maxPrice = Math.max(...displayData.map(d => d.price), 0.5);

    return (
        <div className="chart-container">
            <h4 className="chart-title">MapCap Price Trend</h4>
            <div className="chart-bars-area">
                {displayData.map((item, index) => (
                    <div key={index} className="bar-wrapper">
                        <div 
                            className="bar-element" 
                            style={{ height: `${(item.price / maxPrice) * 100}%` }}
                        >
                            <span className="price-tag">{item.price.toFixed(3)}</span>
                        </div>
                        <span className="day-tag">D{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IpoChart;
