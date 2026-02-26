import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

/**
 * Renders a professional SVG Line Chart for price trends.
 * Optimized for lightweight performance in Pi Browser.
 */
const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    const displayData = data && data.length > 0 ? data : [
        { day: 1, price: 0.350 },
        { day: 5, price: 0.380 },
        { day: 10, price: 0.410 },
        { day: 15, price: 0.436 }
    ];

    // Chart dimensions for SVG coordinate mapping
    const width = 300;
    const height = 150;
    const padding = 30;

    const maxPrice = Math.max(...displayData.map(d => d.price), 0.5);
    const minPrice = Math.min(...displayData.map(d => d.price), 0.3);
    const maxDay = Math.max(...displayData.map(d => d.day), 28);

    /**
     * Maps data points to SVG coordinate space.
     */
    const getCoords = (day: number, price: number) => {
        const x = (day / maxDay) * (width - padding * 2) + padding;
        const y = height - ((price - minPrice) / (maxPrice - minPrice)) * (height - padding * 2) - padding;
        return { x, y };
    };

    // Construct the SVG path string (Move to first point, then line to others)
    const linePath = displayData.reduce((path, point, i) => {
        const { x, y } = getCoords(point.day, point.price);
        return i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`;
    }, "");

    return (
        <div className="chart-container">
            <h4 className="chart-title">MapCap Spot-price</h4>
            <svg viewBox={`0 0 ${width} ${height}`} className="line-chart-svg">
                {/* Horizontal Grid Lines */}
                {[0, 0.5, 1].map((tick) => (
                    <line 
                        key={tick}
                        x1={padding} y1={padding + tick * (height - padding * 2)} 
                        x2={width - padding} y2={padding + tick * (height - padding * 2)} 
                        className="grid-line" 
                    />
                ))}

                {/* The Price Trend Line */}
                <path d={linePath} className="chart-path" />

                {/* Interactive Data Points */}
                {displayData.map((point, i) => {
                    const { x, y } = getCoords(point.day, point.price);
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="3" className="chart-point" />
                            {i === displayData.length - 1 && (
                                <text x={x} y={y - 10} className="price-tag" textAnchor="middle">
                                    {point.price.toFixed(3)}
                                </text>
                            )}
                        </g>
                    );
                })}

                {/* Axis Labels */}
                <text x={padding} y={height - 5} className="axis-label">Day 0</text>
                <text x={width - padding} y={height - 5} className="axis-label" textAnchor="end">Day {maxDay}</text>
            </svg>
        </div>
    );
};

export default IpoChart;
