import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"; // Import useHistory từ react-router-dom

const ServiceCard = () => {
  const [cardData, setCardData] = useState([]);


  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchService = async () => {
      console.log("Fetching gym packages..."); // Kiểm tra xem đoạn code có chạy đến đây không
      
      try {
        const response = await fetch('http://localhost:3002/service/getAllServices');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched data:", data); // Kiểm tra dữ liệu trả về
        setCardData(data);
      } catch (error) {
        console.error("Error fetching gym packages:", error);
      }
    };
  
    fetchService();
  }, []);
  

  return (
    <section className="max-w-7xl mx-auto px-4 py-36">
      <h2 className="text-4xl font-semibold text-center mb-12">CÁC DỊCH VỤ CỦA CHÚNG TÔI</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {cardData.length > 0 ? (
          cardData.map((card) => (
            <Link 
            to={`/servicedetail/${card.id}`} 
            key={card.id} 
            className="block w-full" // Đảm bảo Link bao phủ toàn bộ card
          >
            <div
              key={card.id}
              className="w-96 h-full overflow-hidden bg-white shadow-md rounded-lg cursor-pointer" 
               // Sự kiện nhấn vào card
            >
              <div className="m-0 rounded-none transition-transform transform hover:scale-105"> {/* Hiệu ứng phóng to */}
                <img
                  src={`/images/${card.image}`}
                  alt={card.packageName}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-black text-2xl font-semibold text-center">
                  {card.serviceName}
                </h4>
                <p className="text-black mt-3 font-normal">
                  {card.description}
                </p>
              </div>
            </div>
            </Link>
           
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default ServiceCard;
