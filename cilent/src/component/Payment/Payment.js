import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from "react-router-dom";
import AuthContext from '../../Context/AuthContext';

export default function PaymentForm() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredTrainer, setHoveredTrainer] = useState(null);
  const [trainerDetails, setTrainerDetails] = useState(null);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const planId = location.state?.planId;
  const price = location.state?.price;

  const { user } = useContext(AuthContext);
  console.log("Current user:", price);




  useEffect(() => {
    const fetchTrainers = async () => {
      console.log("Fetching trainers...");
      try {
        const response = await fetch('http://localhost:3002/trainer/getAllTrainers');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchTrainerDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/trainer/getTrainer/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setTrainerDetails(data);
    } catch (error) {
      console.error("Error fetching trainer details:", error);
    }
  };

  const handleTrainerHover = (trainerId) => {
    setHoveredTrainer(trainerId);
    fetchTrainerDetails(trainerId);
  };

  const handleTrainerSelect = (trainer) => {
    setSelectedTrainer(trainer.id);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedTrainer || !planId) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    // Cấu trúc dữ liệu gửi đi
    const requestData = {
      userId: user.id,
      totalAmount: price,
      status: 'pending',
      orderDetails: [{
        gymPackageId: planId,
        trainerId: selectedTrainer,
        price: price,
      }]
    };

    try {
      const response = await fetch('http://localhost:3002/order/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), // Gửi đúng cấu trúc dữ liệu
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order created:", result);
      alert('Đơn hàng đã được tạo thành công!');
    } catch (error) {
      console.error("Error creating order:", error);
      alert('Đã xảy ra lỗi trong quá trình tạo đơn hàng.');
    }
  };

  return (
    <main className="pt-[80px] pb-12 min-h-screen">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-12">
        <div className="w-full h-48 bg-gray-800 rounded-lg mb-6">
          <img
             src={`/images/media.jpg`} 
            alt="Promotion Banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <h1 className="text-2xl text-black font-bold text-center mb-8">THANH TOÁN TRỰC TUYẾN </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* <div>
            <input
              type="email"
              placeholder="Email(*)"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Cập nhật email khi người dùng nhập
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Thêm validation
            />
          </div> */}

          <div className="relative" ref={dropdownRef}>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedTrainer ? trainers.find(t => t.id === selectedTrainer)?.name : "Chọn Huấn Luyện Viên(*)"}
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 text-black w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {trainers.map(trainer => (
                  <div
                    key={trainer.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer relative"
                    onClick={() => handleTrainerSelect(trainer)}
                    onMouseEnter={() => handleTrainerHover(trainer.id)}
                    onMouseLeave={() => setHoveredTrainer(null)}
                  >
                    {trainer.name}
                    {hoveredTrainer === trainer.id && trainerDetails && (
                      <div className="absolute z-20 w-64 p-2 mt-1 text-sm leading-tight text-white rounded-lg left-full ml-2">
                        <div className="bg-white shadow-xl rounded-lg py-3">
                          <div className="photo-wrapper p-2">
                            <img
                              className="w-32 h-32 rounded-full mx-auto"
                              src={`/images/${trainerDetails.image}`}
                              alt={trainerDetails.name}
                            />
                          </div>
                          <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{trainerDetails.name}</h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                              <p>Chuyên môn: {trainerDetails.bio}</p>
                            </div>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                              <p>Kinh nghiệm: {trainerDetails.experience_years} năm</p>
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
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-4">Phương thức thanh toán</p>
            <div className="flex space-x-4 mb-6">
              
                <img
                  className="w-12 h-12"
                  src="https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6"
                  alt="MoMo"
                />
              

            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4">ĐIỀU KIỆN ÁP DỤNG GÓI ƯU ĐÃI</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Khách hàng đủ từ 15 tuổi trở lên, ở thời điểm sử dụng dịch vụ</li>
              <li>Gói dịch vụ này chỉ áp cho việc sử dụng dịch vụ tại 01 câu lạc bộ</li>
              <li>Khách hàng chưa sử dụng bất kỳ dịch vụ hoặc gói tập nào được cung cấp bởi California Fitness & Yoga trong vòng 06 tháng gần nhất</li>
              <li>Gói tập luyện đã thanh toán sẽ không được hoàn tiền lại dưới mọi hình thức</li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>THANH TOÁN NGAY</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
