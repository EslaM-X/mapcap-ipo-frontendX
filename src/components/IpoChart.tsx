import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    // Ensuring Day 0 - 28 visualization per Philip's specs
    const displayData = data?.length > 0 ? data : [{ day: 0, price: 0 }];

    const width = 350;
    const height = 200;
    const padding = 40;

    // Fixed scales: Y-axis (0-60), X-axis (0-28)
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
                {/* Horizontal Grid & Price Labels */}
                {[12, 24, 36, 48, 60].map((val) => {
                    const { y } = getCoords(0, val);
                    return (
                        <g key={val}>
                            <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f0f0f0" strokeWidth="1" />
                            <text x={padding - 5} y={y + 4} textAnchor="end" className="text-[10px] fill-gray-400 font-sans">
                                {val.toFixed(1)}
                            </text>
                        </g>
                    );
                })}

                {/* Primary Trend Line (On-chain performance) */}
                <path d={linePath} fill="none" stroke="#007a33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Timeline Labels */}
                {[0, 7, 14, 21, 28].map((day) => {
                    const { x } = getCoords(day, 0);
                    return (
                        <text key={day} x={x} y={height - 15} textAnchor="middle" className="text-[10px] fill-gray-400 font-sans">
                            {day === 0 ? "Day 0" : day}
                        </text>
                    );
                })}

                {/* Loading state for real-time sync */}
                {displayData.length <= 1 && (
                    <text x={width / 2} y={height / 2} textAnchor="middle" className="fill-[#007a33] italic text-xs">
                        Syncing on-chain data...
                    </text>
                )}
            </svg>
        </div>
    );
};

export default IpoChart;
