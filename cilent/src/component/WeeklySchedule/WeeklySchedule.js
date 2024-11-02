import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
export default function WeeklySchedule() {
    const hours = Array.from({ length: 13 }, (_, i) => `${(i + 9).toString().padStart(2, '0')}:00`);
    const [date, setDate] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();
    const trainerId = location.state?.trainerId;
    const price = location.state?.price;
    const planId = location.state?.planId;
    const trainerName = location.state?.trainerName;
    const weeks = location.state?.weeks;
    const sessionsPerWeek = location.state?.sessionsPerWeek;
    const durationInMonths = location.state?.durationInMonths;
    const serviceName = location.state?.serviceName;
    const [schedules, setSchedules] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [firstSelectedWeek, setFirstSelectedWeek] = useState(null);
    


    

    useEffect(() => {
        const fetchTrainerSchedule = async () => {
            try {
                const response = await fetch(`http://localhost:3002/schedule/getschedulesbyTrainer/${trainerId}`);
                const data = await response.json();
                setSchedules(data);

                const bookedResponse = await fetch(`http://localhost:3002/order/getOrderdetailbyTrainer/${trainerId}`);
                const bookedData = await bookedResponse.json();
                setBookedSlots(bookedData.orderDetails || []); // Cập nhật để sử dụng orderDetails từ response
            } catch (error) {
                console.error('Error fetching trainer schedule:', error);
            }
        };

        if (trainerId) {
            fetchTrainerSchedule();
        }
    }, [trainerId]);

    const isTimeSlotScheduled = (currentDate, hour) => {
        const hourNum = parseInt(hour.split(':')[0]);

        return schedules.some(schedule => {
            const scheduleDate = new Date(schedule.date);
            const isSameDate = currentDate.getFullYear() === scheduleDate.getFullYear() &&
                currentDate.getMonth() === scheduleDate.getMonth() &&
                currentDate.getDate() === scheduleDate.getDate();

            if (!isSameDate) return false;

            const startHour = parseInt(schedule.start_time.split(':')[0]);
            const endHour = parseInt(schedule.end_time.split(':')[0]);

            return hourNum >= startHour && hourNum < endHour;
        });
    };

    const isTimeSlotBooked = (currentDate, hour) => {
        const hourNum = parseInt(hour.split(':')[0]);

        return bookedSlots.some(bookedSlot => {
            const bookedDate = new Date(bookedSlot.sessionDate);
            const bookedHour = parseInt(bookedSlot.sessionTime.split(':')[0]);

            return currentDate.getFullYear() === bookedDate.getFullYear() &&
                currentDate.getMonth() === bookedDate.getMonth() &&
                currentDate.getDate() === bookedDate.getDate() &&
                hourNum === bookedHour;
        });
    };

    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
    };
    
    const handleSlotClick = (fullDate, hour) => {
        const slot = { date: fullDate, hour };
        const isSelected = selectedSlots.some(selectedSlot =>
            selectedSlot.date.getTime() === fullDate.getTime() && selectedSlot.hour === hour
        );
    
        if (isSelected) {
            // Bỏ chọn slot
            setSelectedSlots(prev => {
                const newSelectedSlots = prev.filter(selectedSlot =>
                    !(selectedSlot.date.getTime() === fullDate.getTime() && selectedSlot.hour === hour)
                );
                // Nếu không còn slot nào được chọn, reset firstSelectedWeek
                if (newSelectedSlots.length === 0) {
                    setFirstSelectedWeek(null);
                }
                return newSelectedSlots;
            });
            return;
        }
    
        // Kiểm tra điều kiện nếu có dữ liệu cho weeks và sessionsPerWeek
        if (weeks && sessionsPerWeek) {
            // Kiểm tra số buổi đã chọn trong tuần hiện tại
            const selectedCount = selectedSlots.filter(slot => 
                slot.date.toDateString() === fullDate.toDateString()
            ).length;
    
            if (selectedCount >= sessionsPerWeek) {
                toast.error(`Bạn chỉ được chọn tối đa ${sessionsPerWeek} buổi trong tuần này!`);
                return;
            }
    
            // Xử lý logic tuần đầu tiên và kiểm tra phạm vi weeks
            const currentWeek = getWeekNumber(fullDate);
    
            if (!firstSelectedWeek && selectedSlots.length === 0) {
                // Đây là slot đầu tiên được chọn
                setFirstSelectedWeek(currentWeek);
                setSelectedSlots(prev => [...prev, slot]);
            } else {
                // Kiểm tra xem slot mới có nằm trong phạm vi weeks không
                const weekDiff = Math.abs(currentWeek - firstSelectedWeek);
    
                if (weekDiff > weeks) {
                    toast.error(`Bạn chỉ được chọn lịch trong phạm vi ${weeks} tuần!`);
                    return;
                }
    
                setSelectedSlots(prev => [...prev, slot]);
            }
        } else {
            // Nếu không có weeks hoặc sessionsPerWeek, chọn bình thường
            setSelectedSlots(prev => [...prev, slot]);
        }
    };
    
    

    const isSlotSelected = (fullDate, hour) => {
        return selectedSlots.some(selectedSlot =>
            selectedSlot.date.getTime() === fullDate.getTime() && selectedSlot.hour === hour
        );
    };

    const prevWeek = () => {
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
    };

    const nextWeek = () => {
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
    };

    const getWeekDays = (date) => {
        const startOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        const currentDate = new Date(); // Ngày hiện tại
    
        return Array.from({ length: 7 }, (_, i) => {
            const currentWeekDate = new Date(date.getFullYear(), date.getMonth(), startOfWeek + i);
            const isPastWeek = currentWeekDate < currentDate && currentWeekDate.getDate() !== currentDate.getDate();
            
            return {
                date: currentWeekDate.getDate(),
                day: currentWeekDate.toLocaleDateString('vi-VN', { weekday: 'short' }),
                isWeekend: currentWeekDate.getDay() === 0 || currentWeekDate.getDay() === 6,
                fullDate: currentWeekDate,
                isPastWeek, // Thêm thuộc tính để kiểm tra tuần trước
            };
        });
    };
    
    const weekDays = getWeekDays(date);
    

    const formatSelectedSlots = () => {
        return selectedSlots.map(slot => {
            const date = slot.date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            return `${date} ${slot.hour}`;
        }).join(', ');
    };

    const handleRegister = () => {
        if (selectedSlots.length === 0) {
            toast.error('Vui lòng chọn ngày giờ trước khi đăng ký!');
            return;
        }
    
        // Thêm kiểm tra khi có weeks và sessionsPerWeek
        if (weeks && sessionsPerWeek) {
            // Tính tổng số buổi cần chọn
            const totalRequiredSessions = weeks * sessionsPerWeek;
            
            if (selectedSlots.length < totalRequiredSessions) {
                toast.error(`Vui lòng chọn đủ ${totalRequiredSessions} buổi (${sessionsPerWeek} buổi/tuần trong ${weeks} tuần)!`);
                return;
            }
    
            // Kiểm tra số buổi trong mỗi tuần
            const sessionsByWeek = new Map();
            selectedSlots.forEach(slot => {
                const weekNumber = getWeekNumber(slot.date);
                sessionsByWeek.set(weekNumber, (sessionsByWeek.get(weekNumber) || 0) + 1);
            });
    
            // Kiểm tra xem mỗi tuần có đủ số buổi không
            for (const [weekNum, count] of sessionsByWeek) {
                if (count !== sessionsPerWeek) {
                    toast.error(`Mỗi tuần phải có đủ ${sessionsPerWeek} buổi!`);
                    return;
                }
            }
        }
    
        navigate('/thanhtoan', { 
            state: { 
                selectedSlots,
                price,
                planId,
                trainerId,
                weeks, 
                sessionsPerWeek, 
                durationInMonths,
                selectedTimesFormatted: formatSelectedSlots(),
                trainerName,
                serviceName,
            }
        });
    };

    return (
        
        <div className="mt-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.3)] p-4 text-black flex-1"> {/* Thay shadow thành shadow-lg */}
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
                        const isScheduled = isTimeSlotScheduled(fullDate, hour);
                        const isBooked = isTimeSlotBooked(fullDate, hour);
                        const isSelected = isSlotSelected(fullDate, hour);
    
                        // Nếu slot đã được đặt, chỉ hiển thị ô màu xám
                        if (isBooked) {
                            return (
                                <div key={`${date}-${hour}`} className="border-gray-200 flex flex-col gap-1 mb-1">
                                    <div className="flex items-center justify-center w-full h-[62.5px] text-center bg-gray-300 rounded-md opacity-40 cursor-not-allowed">
                                        <span className="text-sm font-semibold">{hour}</span>
                                    </div>
                                    <div className="flex items-center justify-center w-full h-[62.5px] text-center bg-gray-300 rounded-md opacity-40 cursor-not-allowed">
                                        <span className="text-sm font-semibold">{`${hour.split(':')[0]}:30`}</span>
                                    </div>
                                </div>
                            );
                        }
    
                        // Nếu có trong lịch làm việc của huấn luyện viên
                        if (isScheduled) {
                            return (
                                <div
                                    key={`${date}-${hour}`}
                                    className={`h-[129px] cursor-pointer flex items-center justify-center mb-1 transition-colors duration-200 ${isSelected ? 'bg-blue-500 text-white' : 'bg-[#d4e2ff] hover:bg-blue-100'}`}
                                    onClick={() => handleSlotClick(fullDate, hour)}
                                >
                                    <div className="text-center text-sm font-semibold w-full h-full flex items-center justify-center">
                                        {hour}
                                    </div>
                                </div>
                            );
                        }
    
                        // Nếu không có trong lịch làm việc
                        return (
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
    
        <button
            onClick={handleRegister}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
            Đăng ký
        </button>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
        />
    </div>
    
    );
}