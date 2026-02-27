import React from 'react';

interface ChartData {
    day: number;
    price: number;
}

const IpoChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    const displayData = data?.length > 1 ? data : [
        { day: 0, price: 0 }, { day: 1, price: 2 }, { day: 2, price: 4 }
    ];

    const width = 450;
    const height = 300;
    const paddingLeft = 65;   
    const paddingBottom = 60; 
    const paddingRight = 30;
    const paddingTop = 70; // زيادة المساحة العلوية عشان العنوان

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
            {/* الكارت الأبيض الرئيسي مع حواف أنعم وظل خفيف */}
            <div className="relative w-[95%] max-w-[500px] bg-white border-[1px] border-gray-200 shadow-md rounded-2xl overflow-hidden">
                
                {/* تعديل العنوان ليكون في المنتصف تماماً */}
                <div className="w-full text-center pt-5">
                    <h3 className="text-[#333] font-bold text-[17px] m-0">
                        MapCap Spot-price
                    </h3>
                </div>

                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                    {/* Grid lines */}
                    {[12, 24, 36, 48, 60].map((val) => {
                        const { y } = getCoords(0, val);
                        return (
                            <line key={val} x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#f2f2f2" strokeWidth="1" />
                        );
                    })}

                    {/* المحاور والأرقام */}
                    {[0, 12, 24, 36, 48, 60].map((val) => {
                        const { y } = getCoords(0, val);
                        return (
                            <g key={val}>
                                <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="text-[12px] fill-gray-500 font-sans">
                                    {val === 0 ? "0 pi" : val.toFixed(1)}
                                </text>
                            </g>
                        );
                    })}

                    {[0, 7, 14, 21, 28].map((day) => {
                        const { x } = getCoords(day, 0);
                        return (
                            <g key={day}>
                                <text x={x} y={height - paddingBottom + 25} textAnchor="middle" className="text-[12px] fill-gray-500 font-sans">
                                    {day === 0 ? "Day 0" : day}
                                </text>
                            </g>
                        );
                    })}

                    {/* برواز الشارط (المربع الأسود) */}
                    <rect x={paddingLeft} y={paddingTop} width={width-paddingLeft-paddingRight} height={height-paddingTop-paddingBottom} fill="none" stroke="#333" strokeWidth="1" />

                    {/* الخط الأخضر للبيانات */}
                    <path d={linePath} fill="none" stroke="#007a33" strokeWidth="2" strokeLinejoin="round" />

                    {/* النقط الذهبية - لإضافة لمسة جمالية تليق بـ Map-of-Pi */}
                    {displayData.map((point, i) => {
                        const { x, y } = getCoords(point.day, point.price);
                        return (
                            <circle key={i} cx={x} cy={y} r="3.5" fill="#ffd700" stroke="#007a33" strokeWidth="1" />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default IpoChart;
