import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from "react-router-dom";

export default function WeeklySchedule() {
    const hours = Array.from({ length: 13 }, (_, i) => `${(i + 9).toString().padStart(2, '0')}:00`);
    const [date, setDate] = useState(new Date());
    const location = useLocation();
    const trainerId = location.state?.trainerId;
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchTrainerSchedule = async () => {
            try {
                const response = await fetch(`http://localhost:3002/schedule/getschedulesbyTrainer/${trainerId}`);
                const data = await response.json();
                setSchedules(data);
            } catch (error) {
                console.error('Error fetching trainer schedule:', error);
            }
        };

        if (trainerId) {
            fetchTrainerSchedule();
        }
    }, [trainerId]);

    const isTimeSlotAvailable = (currentDate, hour) => {
        // Duyệt qua từng lịch trình để kiểm tra
        return schedules.some(schedule => {
            // Chuyển đổi ngày từ lịch trình sang đối tượng Date để so sánh
            const scheduleDate = new Date(schedule.date);
            
            // Kiểm tra xem ngày hiện tại có khớp với ngày trong lịch trình không
            const isSameDate = currentDate.getFullYear() === scheduleDate.getFullYear() &&
                               currentDate.getMonth() === scheduleDate.getMonth() &&
                               currentDate.getDate() === scheduleDate.getDate();
    
            if (!isSameDate) return false;
    
            // Chuyển đổi giờ để so sánh khoảng thời gian
            const hourNum = parseInt(hour);
            const startHour = parseInt(schedule.start_time.split(':')[0]);
            const endHour = parseInt(schedule.end_time.split(':')[0]);
            
            return hourNum >= startHour && hourNum < endHour;
        });
    };
    

    const prevWeek = () => {
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
    };

    const nextWeek = () => {
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
    };

    const getWeekDays = (date) => {
        const startOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return Array.from({ length: 7 }, (_, i) => {
            const currentDate = new Date(date.getFullYear(), date.getMonth(), startOfWeek + i);
            return {
                date: currentDate.getDate(),
                day: currentDate.toLocaleDateString('vi-VN', { weekday: 'short' }),
                isWeekend: currentDate.getDay() === 0 || currentDate.getDay() === 6,
                fullDate: currentDate,
            };
        });
    };

    const weekDays = getWeekDays(date);

    return (
        <div className="mt-40 flex flex-col items-center justify-center w-full max-w-5xl mx-auto bg-white rounded-lg shadow p-4 text-black flex-1">
            <div className="flex items-center justify-between mb-6 w-full">
                <button 
                    onClick={prevWeek} 
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                >
                    <ChevronLeft className="w-5 h-5" />
                    TUẦN TRƯỚC
                </button>

                <h2 className="text-lg font-medium">
                    {date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                </h2>

                <button 
                    onClick={nextWeek} 
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                >
                    TUẦN SAU
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-8 gap-2 w-full max-w-full ml-[130px] justify-center">
                {weekDays.map(({ date, day, isWeekend, fullDate }) => (
                    <div key={date} className="bg-white">
                        <div className={`h-16 p-2 text-center ${isWeekend ? 'bg-gray-100' : ''}`}>
                            <div className="text-sm text-gray-500">{date}</div>
                            <div className={`font-medium ${isWeekend ? 'text-red-500' : 'text-gray-900'}`}>{day}</div>
                        </div>

                        {hours.map((hour) => {
                            const hasData = isTimeSlotAvailable(fullDate, hour);
                            return hasData ? (
                                <div key={`${date}-${hour}`} className="h-[129px] hover:bg-blue-100 hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center mb-1">
                                    <div className="bg-[#d4e2ff] hover:bg-blue-500 text-[#333333] hover:text-white text-center text-sm font-semibold rounded-[4px] w-full h-full flex items-center justify-center">
                                        Có thông tin
                                    </div>
                                </div>
                            ) : (
                                <div key={hour} className="border-gray-200 flex flex-col gap-1 mb-1">
                                    <div className="flex items-center justify-center w-full h-[62.5px] text-center bg-gray-300 rounded-md opacity-40 cursor-not-allowed">
                                        <span className="text-sm font-semibold">{hour}</span>
                                    </div>
                                    <div className="flex items-center justify-center w-full h-[62.5px] text-center bg-gray-300 rounded-md opacity-40 cursor-not-allowed">
                                        <span className="text-sm font-semibold">{`${hour.split(':')[0]}:30`}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

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