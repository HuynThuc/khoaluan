import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WeeklySchedule() {
    // Dữ liệu mẫu cho tuần
    const week = [
        { date: 'Oct 21', day: 'Mon', isWeekend: false, hasData: false },
        { date: 'Oct 22', day: 'Tue', isWeekend: false, hasData: true },
        { date: 'Oct 23', day: 'Wed', isWeekend: false, hasData: false },
        { date: 'Oct 24', day: 'Thu', isWeekend: false, hasData: true },
        { date: 'Oct 25', day: 'Fri', isWeekend: false, hasData: false },
        { date: 'Oct 26', day: 'Sat', isWeekend: true, hasData: false },
        { date: 'Oct 27', day: 'Sun', isWeekend: true, hasData: false },
    ];

    const hours = Array.from({ length: 13 }, (_, i) => `${(i + 9).toString().padStart(2, '0')}:00`);

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto bg-white rounded-lg shadow p-4 text-black flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 w-full">
                <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <ChevronLeft className="w-5 h-5 mr-1" /> TUẦN TRƯỚC
                </button>
                <h2 className="text-lg font-medium">21 — 27 October</h2>
                <button className="flex items-center text-gray-600 hover:text-gray-800">
                    TUẦN SAU <ChevronRight className="w-5 h-5 ml-1" />
                </button>
            </div>

            {/* Lưới lịch */}
            <div className="grid grid-cols-8 gap-2 w-full max-w-full ml-[130px] justify-center">
                {week.map(({ date, day, isWeekend, hasData }) => (
                    <div key={date} className="bg-white">
                        {/* Header ngày */}
                        <div className={`h-16 p-2 text-center ${isWeekend ? 'bg-gray-100' : ''}`}>
                            <div className="text-sm text-gray-500">{date}</div>
                            <div className={`font-medium ${isWeekend ? 'text-red-500' : 'text-gray-900'}`}>{day}</div>
                        </div>

                        {/* Khung thời gian */}
                        {hasData ? (
                            hours.map((hour) => (
                                <div key={`${date}-${hour}`} className="h-[129px] hover:bg-blue-100 hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center mb-1">
                                    <div className="bg-[#d4e2ff] hover:bg-blue-500 text-[#333333] hover:text-white text-center text-sm font-semibold rounded-[4px] w-full h-full flex items-center justify-center">
                                        Có thông tin
                                    </div>
                                </div>
                            ))
                        ) : (
                            hours.map((hour) => (
                                <div key={hour} className="border-gray-200 flex flex-col gap-1 mb-1">
                                    <div className="flex items-center justify-center w-full h-[62.5px] text-center bg-gray-300 rounded-md opacity-40 cursor-not-allowed">
                                        <span className="text-sm font-semibold">{hour}</span>
                                    </div>
                                    <div className="flex items-center justify-center w-full h-[62.5px] text-center bg-gray-300 rounded-md opacity-40 cursor-not-allowed">
                                        <span className="text-sm font-semibold">{`${hour.split(':')[0]}:30`}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>

            {/* Chú thích */}
            <div className="mt-4 flex gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-100 mr-2" />
                    <span>Có sẵn</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-200 mr-2" />
                    <span>Không có sẵn</span>
                </div>
            </div>
        </div>
    );
}
