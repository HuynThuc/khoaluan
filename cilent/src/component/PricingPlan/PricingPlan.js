import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

const PricingSection = () => {
  const [gymPackages, setGymPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGymPackages = async () => {
      console.log("Fetching gym packages...");
      try {
        const response = await fetch('http://localhost:3002/gymPackage/getAllPackage');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setGymPackages(data);
      } catch (error) {
        console.error("Error fetching gym packages:", error);
      }
    };

    fetchGymPackages();
  }, []);

  const handleEnrollNow = (planId, price) => {
    navigate('/payment', { state: { planId, price } });
  };

  return (
    <section className="bg-[#151515] py-16">
      <div className="container mx-auto">
        <div className="text-center mb-14">
        <h2 className="text-4xl font-semibold text-center mb-4">GÓI HỘI VIÊN</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
        Chúng tôi cung cấp các gói hội viên linh hoạt và phù hợp với nhiều đối tượng khách hàng. Bạn có thể lựa chọn giữa các gói tập theo thời gian (tháng, quý, năm) hoặc theo số buổi tập.
      </p>
        </div>
        <div className="flex flex-wrap justify-center gap-12">
          {gymPackages.map((pack) => (
            <div
              key={pack.id}
              className="bg-transparent transform -skew-y-6 w-[320px] h-[500px] border border-gray-700 text-center p-10 hover:bg-white hover:border-white relative flex flex-col justify-between transition-all duration-500 group"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4 skew-y-6 text-white transition-colors duration-300 group-hover:text-black">
                  {pack.name}
                </h3>
                <div className="mb-6 skew-y-6">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {Number(pack.price).toLocaleString('vi-VN', { style: 'decimal' })}đ
                  </h2>
                </div>
                <ul className="text-gray-400 space-y-3 mb-10 skew-y-6 overflow-y-auto p-2">
                  {pack.description.split('\n').map((feature, index) => (
                    <li key={index} className="text-gray-400 transition-colors duration-300 group-hover:text-black">
                      {parse(feature)}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleEnrollNow(pack.id, pack.price)}
                className="block w-full skew-y-6 bg-gray-700 text-white py-3 px-6 rounded hover:bg-blue-600 transition-all duration-300"
              >
                ĐĂNG KÍ
              </button>
              <a
                href="#"
                className="absolute left-12 bottom-32 text-4xl text-[#f36100] opacity-0 invisible transition-opacity duration-500 hover:opacity-100 hover:visible"
              >
                <i className="fa fa-picture-o"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
