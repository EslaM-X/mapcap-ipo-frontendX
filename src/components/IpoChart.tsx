import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    // محاكاة البيانات لضمان ظهور الرسم البياني فوراً بشكل احترافي
    const displayData = data?.length > 1 ? data : [
        { day: 0, price: 0 }, { day: 2, price: 4 }, { day: 4, price: 10 },
        { day: 7, price: 12 }, { day: 10, price: 10 }, { day: 12, price: 18 },
        { day: 14, price: 16 }, { day: 16, price: 24 }
    ];

    const width = 400;
    const height = 250;
    const padding = 50;
    const yScaleMax = 60;
    const xScaleMax = 28;

    const getCoords = (day: number, price: number) => {
        const x = (day / xScaleMax) * (width - padding * 2) + padding;
        const y = height - (price / yScaleMax) * (height - padding * 2) - padding;
        return { x, y };
    };

    // رسم مسار الخط الأخضر
    const linePath = displayData.reduce((path, point, i) => {
        const { x, y } = getCoords(point.day, point.price);
        return i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`;
    }, "");

    return (
        <div className="w-full flex flex-col items-center bg-white border-2 border-black p-2 relative">
            {/* عنوان داخلي مطابق للصورة المرجعية */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white px-3 z-10">
                <span className="text-black font-bold text-[12px] uppercase">MapCap Spot-price</span>
            </div>
            
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto font-sans">
                {/* رسم الشبكة (Grid) والخطوط العرضية السوداء */}
                {[0, 12, 24, 36, 48, 60].map((val) => {
                    const { y } = getCoords(0, val);
                    return (
                        <g key={val}>
                            <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e0e0e0" strokeWidth="1" />
                            <text x={padding - 8} y={y + 4} textAnchor="end" className="text-[11px] fill-black font-bold">
                                {val.toFixed(1)}
                            </text>
                        </g>
                    );
                })}

                {/* رسم الشبكة الطولية (Vertical Grid) */}
                {[0, 7, 14, 21, 28].map((day) => {
                    const { x } = getCoords(day, 0);
                    return (
                        <g key={day}>
                            <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="#e0e0e0" strokeWidth="1" />
                            <text x={x} y={height - 25} textAnchor="middle" className="text-[11px] fill-black font-bold">
                                {day === 0 ? "Day 0" : day}
                            </text>
                        </g>
                    );
                })}

                {/* المحاور الرئيسية بلون أسود صريح */}
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" strokeWidth="2" />
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" strokeWidth="2" />

                {/* خط الاتجاه (Trend Line) باللون الأخضر الغامق */}
                <path d={linePath} fill="none" stroke="#007a33" strokeWidth="2" strokeLinejoin="round" />

                {/* نقط البيانات (Nodes) - لمسة احترافية مطابقة للصورة */}
                {displayData.map((point, i) => {
                    const { x, y } = getCoords(point.day, point.price);
                    return (
                        <circle key={i} cx={x} cy={y} r="3" fill="#007a33" stroke="black" strokeWidth="0.5" />
                    );
                })}

                {/* تسمية المحور الرأسي */}
                <text x={padding - 35} y={height - padding + 5} className="text-[10px] fill-black italic">0 pi</text>
            </svg>
        </div>
    );
};

export default IpoChart;
