import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    // بيانات تجريبية تحاكي المنحنى المتصاعد في الصورة الأصلية
    const displayData = data?.length > 1 ? data : [
        { day: 0, price: 0 }, { day: 1, price: 2 }, { day: 2, price: 4 },
        { day: 3, price: 7 }, { day: 5, price: 8 }, { day: 7, price: 12 },
        { day: 9, price: 10 }, { day: 11, price: 18 }, { day: 13, price: 17 },
        { day: 15, price: 24 }
    ];

    // أبعاد الرسم لضمان عدم التداخل
    const width = 450;
    const height = 300;
    const paddingLeft = 65;   // مساحة كافية لـ "0 pi"
    const paddingBottom = 60; // مساحة كافية لـ "Day 0"
    const paddingRight = 30;
    const paddingTop = 50;

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
            <div className="relative w-full max-w-[500px] bg-white border-[1px] border-black shadow-sm">
                
                {/* العنوان الداخلي - مطابق للصورة بالملي */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
                    <span className="text-black font-medium text-[15px] font-sans">MapCap Spot-price</span>
                </div>

                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                    {/* خطوط الشبكة الباهتة (Grid) */}
                    {[12, 24, 36, 48, 60].map((val) => {
                        const { y } = getCoords(0, val);
                        return (
                            <line key={val} x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#eeeeee" strokeWidth="1" />
                        );
                    })}
                    {[7, 14, 21].map((day) => {
                        const { x } = getCoords(day, 0);
                        return (
                            <line key={day} x1={x} y1={paddingTop} x2={x} y2={height - paddingBottom} stroke="#eeeeee" strokeWidth="1" />
                        );
                    })}

                    {/* أرقام المحور الرأسي (Price) */}
                    {[0, 12, 24, 36, 48, 60].map((val) => {
                        const { y } = getCoords(0, val);
                        return (
                            <g key={val}>
                                {/* شرطة المحور (Tick) */}
                                <line x1={paddingLeft - 5} y1={y} x2={paddingLeft} y2={y} stroke="black" strokeWidth="1" />
                                <text x={paddingLeft - 12} y={y + 5} textAnchor="end" className="text-[14px] fill-black font-sans">
                                    {val === 0 ? "0 pi" : val.toFixed(1)}
                                </text>
                            </g>
                        );
                    })}

                    {/* أرقام المحور الأفقي (Days) */}
                    {[0, 7, 14, 21, 28].map((day) => {
                        const { x } = getCoords(day, 0);
                        return (
                            <g key={day}>
                                {/* شرطة المحور (Tick) */}
                                <line x1={x} y1={height - paddingBottom} x2={x} y2={height - paddingBottom + 5} stroke="black" strokeWidth="1" />
                                <text x={x} y={height - paddingBottom + 25} textAnchor="middle" className="text-[14px] fill-black font-sans">
                                    {day === 0 ? "Day 0" : day}
                                </text>
                            </g>
                        );
                    })}

                    {/* المحاور الرئيسية السوداء - قوية وصريحة كما في الصورة */}
                    <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={height - paddingBottom} stroke="black" strokeWidth="1.2" />
                    <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="black" strokeWidth="1.2" />
                    {/* الخطوط المقفلة للمربع */}
                    <line x1={width - paddingRight} y1={paddingTop} x2={width - paddingRight} y2={height - paddingBottom} stroke="black" strokeWidth="1.2" />
                    <line x1={paddingLeft} y1={paddingTop} x2={width - paddingRight} y2={paddingTop} stroke="black" strokeWidth="1.2" />

                    {/* منحنى السعر الأخضر الغامق */}
                    <path d={linePath} fill="none" stroke="#007a33" strokeWidth="1.5" strokeLinejoin="round" />

                    {/* نقط البيانات (الدوائر الخضراء الصغيرة) - تفصيلة مهمة جداً */}
                    {displayData.map((point, i) => {
                        const { x, y } = getCoords(point.day, point.price);
                        return (
                            <circle key={i} cx={x} cy={y} r="2.5" fill="#007a33" stroke="#222" strokeWidth="0.5" />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default IpoChart;
