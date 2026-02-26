import React from 'react';

interface StatsProps {
    totalInvestors: number;
    totalPiInvested: number;
    userPiInvested: number;
    capitalGain: number;
}

const StatsBoard: React.FC<StatsProps> = ({ 
    totalInvestors = 125, 
    totalPiInvested = 4850.00, 
    userPiInvested = 50.00, 
    capitalGain = 445.269 
}) => {
    
    // تنسيق الأرقام لتطابق الصورة المرجعية (3 أرقام عشرية للربح)
    const formatValue = (value: number, decimals: number = 2) => 
        value.toLocaleString(undefined, { 
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals 
        });

    return (
        <div className="w-full px-4 py-3 bg-[#f4f1ea]">
            {/* الحاوية الرئيسية: حواف دائرية كبيرة، خلفية فاتحة، وإطار رمادي نحيف جداً */}
            <div className="w-full bg-[#f4f1ea] border-[1px] border-[#d1d5db] rounded-[30px] p-6 shadow-sm">
                
                {/* العنوان: مطابق للخط والحجم في الصورة */}
                <h3 className="text-black text-[17px] font-sans font-medium mb-4">
                    MapCap IPO Statistics:
                </h3>

                {/* قائمة الإحصائيات بالنقاط السوداء (Bullets) */}
                <ul className="space-y-2.5">
                    
                    {/* Item 1: Total Investors */}
                    <li className="flex items-start text-black text-[15px] font-sans">
                        <span className="mr-3 text-[20px] leading-none mt-[-2px]">•</span>
                        <span>Total investors to date: {totalInvestors}</span>
                    </li>
                    
                    {/* Item 2: Total Pi Invested */}
                    <li className="flex items-start text-black text-[15px] font-sans">
                        <span className="mr-3 text-[20px] leading-none mt-[-2px]">•</span>
                        <span>Total pi invested to date: {formatValue(totalPiInvested)} π</span>
                    </li>

                    {/* Item 3: User Investment */}
                    <li className="flex items-start text-black text-[15px] font-sans">
                        <span className="mr-3 text-[20px] leading-none mt-[-2px]">•</span>
                        <span>Your pi invested to date: {formatValue(userPiInvested)} π</span>
                    </li>

                    {/* Item 4: Capital Gain */}
                    <li className="flex items-start text-black text-[15px] font-sans">
                        <span className="mr-3 text-[20px] leading-none mt-[-2px]">•</span>
                        <span>Your capital gain to date: +{formatValue(capitalGain, 3)} π</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default StatsBoard;
