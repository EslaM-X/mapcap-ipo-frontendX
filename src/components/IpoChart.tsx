import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    // بيانات افتراضية لمحاكاة الشكل المطلوب في الصورة
    const displayData = data?.length > 1 ? data : [
        { day: 0, price: 0 }, { day: 2, price: 5 }, { day: 5, price: 10 },
        { day: 7, price: 12 }, { day: 10, price: 15 }, { day: 14, price: 24 }
    ];

    const width = 400;
    const height = 280; // زيادة الارتفاع لمنع التداخل
    const paddingLeft = 60; // زيادة المساحة لليبل الـ pi
    const paddingBottom = 50; // زيادة المساحة لليبل الأيام
    const paddingRight = 20;
    const paddingTop = 40;

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
        <div className="w-full bg-[#f4f1ea] p-1 flex flex-col items-center">
            {/* الشارت داخل برواز أسود كما في الصورة 1000303109.jpg */}
            <div className="w-full bg-white border-[1.5px] border-black relative pt-8 shadow-sm">
                
                {/* العنوان الداخلي المربع */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border-x border-b border-black px-4 py-0.5 z-10">
                    <span className="text-black font-bold text-[11px] uppercase tracking-tighter">MapCap Spot-price</span>
                </div>

                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                    {/* شبكة العرض (Price Grid) */}
                    {[0, 12, 24, 36, 48, 60].map((val) => {
                        const { y } = getCoords(0, val);
                        return (
                            <g key={val}>
                                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e5e5e5" strokeWidth="1" />
                                <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="text-[12px] fill-black font-medium">
                                    {val === 0 ? "0 pi" : val.toFixed(1)}
                                </text>
                            </g>
                        );
                    })}

                    {/* شبكة الطول (Days Grid) */}
                    {[0, 7, 14, 21, 28].map((day) => {
                        const { x } = getCoords(day, 0);
                        const { y } = getCoords(day, 60);
                        return (
                            <g key={day}>
                                <line x1={x} y1={paddingTop} x2={x} y2={height - paddingBottom} stroke="#e5e5e5" strokeWidth="1" />
                                <text x={x} y={height - 20} textAnchor="middle" className="text-[12px] fill-black font-medium">
                                    {day === 0 ? "Day 0" : day}
                                </text>
                            </g>
                        );
                    })}

                    {/* محاور الرسم البياني السوداء الصريحة */}
                    <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={height - paddingBottom} stroke="black" strokeWidth="1.5" />
                    <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="black" strokeWidth="1.5" />

                    {/* المنحنى الأخضر الغامق */}
                    <path d={linePath} fill="none" stroke="#007a33" strokeWidth="2" strokeLinejoin="round" />

                    {/* نقط البيانات الخضراء */}
                    {displayData.map((point, i) => {
                        const { x, y } = getCoords(point.day, point.price);
                        return <circle key={i} cx={x} cy={y} r="3" fill="#007a33" stroke="black" strokeWidth="0.5" />;
                    })}
                </svg>
            </div>
        </div>
    );
};

export default IpoChart;
