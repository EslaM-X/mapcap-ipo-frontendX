import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    // بيانات تجريبية
    const displayData = data?.length > 1 ? data : [
        { day: 0, price: 0 }, { day: 1, price: 2 }, { day: 2, price: 4 },
        { day: 3, price: 7 }, { day: 5, price: 8 }, { day: 7, price: 12 },
        { day: 9, price: 10 }, { day: 11, price: 18 }, { day: 13, price: 17 },
        { day: 15, price: 24 }
    ];

    const width = 450;
    const height = 300;
    const paddingLeft = 65;
    const paddingBottom = 60;
    const paddingRight = 30;
    const paddingTop = 60; // زودنا الـ Padding فوق شوية عشان العنوان ميزنقش الخط

    const yScaleMax = 60;
    const xScaleMax = 28;

    const getCoords = (day: number, price: number) => {
        const x = (day / xScaleMax) * (width - paddingLeft - paddingRight) + paddingLeft;
        const y = height - (price / yScaleMax) * (height - paddingTop - paddingBottom) - paddingBottom;
        return { x, y };
    };

    const linePath = displayData.reduce((path, point, i) => {
        const { x, y } = getCoords(point.day, point.price);
        return i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`;
    }, "");

    return (
        <div className="w-full flex justify-center py-4 bg-[#f4f1ea]">
            {/* الحاوية البيضاء الرئيسية */}
            <div className="relative w-[95%] max-w-[500px] bg-white border-[1.5px] border-gray-300 shadow-lg rounded-xl overflow-hidden pt-12 pb-2 px-2">
                
                {/* العنوان - الآن في المنتصف تماماً مع تنسيق أنظف */}
                <div className="absolute top-4 left-0 right-0 text-center">
                    <span className="text-gray-700 font-bold text-[16px] font-sans block">
                        MapCap Spot-price
                    </span>
                </div>

                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                    {/* Grid lines */}
                    {[12, 24, 36, 48, 60].map((val) => {
                        const { y } = getCoords(0, val);
                        return (
                            <line key={val} x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#f0f0f0" strokeWidth="1" />
                        );
                    })}
                    {[7, 14, 21].map((day) => {
                        const { x } = getCoords(day, 0);
                        return (
                            <line key={day} x1={x} y1={paddingTop} x2={x} y2={height - paddingBottom} stroke="#f0f0f0" strokeWidth="1" />
                        );
                    })}

                    {/* Y-Axis labels */}
                    {[0, 12, 24, 36, 48, 60].map((val) => {
                        const { y } = getCoords(0, val);
                        return (
                            <g key={val}>
                                <line x1={paddingLeft - 5} y1={y} x2={paddingLeft} y2={y} stroke="#000" strokeWidth="1" />
                                <text x={paddingLeft - 12} y={y + 5} textAnchor="end" className="text-[12px] fill-gray-600 font-sans">
                                    {val === 0 ? "0 pi" : val.toFixed(1)}
                                </text>
                            </g>
                        );
                    })}

                    {/* X-Axis labels */}
                    {[0, 7, 14, 21, 28].map((day) => {
                        const { x } = getCoords(day, 0);
                        return (
                            <g key={day}>
                                <line x1={x} y1={height - paddingBottom} x2={x} y2={height - paddingBottom + 5} stroke="#000" strokeWidth="1" />
                                <text x={x} y={height - paddingBottom + 25} textAnchor="middle" className="text-[12px] fill-gray-600 font-sans">
                                    {day === 0 ? "Day 0" : day}
                                </text>
                            </g>
                        );
                    })}

                    {/* Main Axis Borders */}
                    <rect x={paddingLeft} y={paddingTop} width={width-paddingLeft-paddingRight} height={height-paddingTop-paddingBottom} fill="none" stroke="#000" strokeWidth="1.2" />

                    {/* Price Line */}
                    <path d={linePath} fill="none" stroke="#007a33" strokeWidth="2" strokeLinejoin="round" />

                    {/* Data points */}
                    {displayData.map((point, i) => {
                        const { x, y } = getCoords(point.day, point.price);
                        return (
                            <circle key={i} cx={x} cy={y} r="3" fill="#ffd700" stroke="#007a33" strokeWidth="1" />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default IpoChart;
