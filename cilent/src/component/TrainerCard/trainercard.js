import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

export default function TrainerCard() {
  const [trainers, setTrainers] = useState([]);
  const location = useLocation();
  const { serviceId } = location.state; // Lấy serviceId từ state

  useEffect(() => {
      const fetchTrainersByService = async () => {
          try {
              const response = await fetch(`http://localhost:3002/trainer/getTrainerByService/${serviceId}`);
              const data = await response.json();
              setTrainers(data);
          } catch (error) {
              console.error("Error fetching trainers:", error);
          }
      };

      fetchTrainersByService();
  }, [serviceId]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-xl font-bold mb-4">Danh sách huấn luyện viên</h2>

      {/* Danh sách huấn luyện viên */}
      <div className="flex flex-wrap gap-4">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="relative z-20 w-64 p-2 mt-4 text-sm leading-tight text-white rounded-lg">
            <div className="bg-white shadow-xl rounded-lg py-3">
              <div className="photo-wrapper p-2">
                <img
                  className="w-32 h-32 rounded-full mx-auto"
                  src={`/images/${trainer.image}`}
                  alt={trainer.name}
                />
              </div>
              <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                  {trainer.name}
                </h3>
                <div className="text-center text-gray-400 text-xs font-semibold">
                  <p>Chuyên môn: {trainer.bio}</p>
                </div>
                <div className="text-center text-gray-400 text-xs font-semibold">
                  <p>Kinh nghiệm: {trainer.experience_years} năm</p>
                </div>
                <div className="text-center my-3">
                  <a
                    className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                    href="#"
                  >
                    Xem hồ sơ
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
