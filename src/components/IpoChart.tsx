import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

/**
 * MapCap Spot-price Line Chart
 * Spec: Philip Jennings [Page 8]
 * Optimized SVG for Pi Browser compatibility.
 */
const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    // Default values strictly matching the document's Day 0 - 28 range
    const displayData = data?.length > 0 ? data : [{ day: 0, price: 0 }];

    const width = 350;
    const height = 200;
    const padding = 40;

    // Spec scale: Y-axis from 0 to 60, X-axis from 0 to 28
    const yScaleMax = 60;
    const xScaleMax = 28;

    const getCoords = (day: number, price: number) => {
        const x = (day / xScaleMax) * (width - padding * 2) + padding;
        const y = height - (price / yScaleMax) * (height - padding * 2) - padding;
        return { x, y };
    };

    const linePath = displayData.reduce((path, point, i) => {
        const { x, y } = getCoords(point.day, point.price);
        return i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`;
    }, "");

    return (
        <div className="w-full flex flex-col items-center">
            <h4 className="text-[#007a33] font-bold text-sm self-start mb-2">MapCap Spot-price</h4>
            
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                {/* Y-Axis Grid Lines & Labels [12.0, 24.0, 36.0, 48.0, 60.0] */}
                {[12, 24, 36, 48, 60].map((val) => {
                    const { y } = getCoords(0, val);
                    return (
                        <g key={val}>
                            <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f0f0f0" strokeWidth="1" />
                            <text x={padding - 5} y={y + 4} textAnchor="end" className="text-[10px] fill-gray-400">{val.toFixed(1)}</text>
                        </g>
                    );
                })}

                {/* The Green Trend Line */}
                <path d={linePath} fill="none" stroke="#007a33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* X-Axis Labels [Day 0, 7, 14, 21, 28] */}
                {[0, 7, 14, 21, 28].map((day) => {
                    const { x } = getCoords(day, 0);
                    return (
                        <text key={day} x={x} y={height - 15} textAnchor="middle" className="text-[10px] fill-gray-400">
                            {day === 0 ? "Day 0" : day}
                        </text>
                    );
                })}

                {/* Empty State Text */}
                {displayData.length <= 1 && (
                    <text x={width / 2} y={height / 2} textAnchor="middle" className="fill-[#007a33] italic text-xs">
                        Calculating...
                    </text>
                )}
            </svg>
        </div>
    );
};

export default IpoChart;
