import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const BookingConfirmation = () => {
  const location = useLocation();
  const { selectedSlots } = location.state || {}; // Lấy dữ liệu selectedSlots từ state

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreeToTerms: false,
    subscribeToPromotions: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };


  console.log('Selected Slots:', selectedSlots);



  return (
    <div className="max-w-4xl mx-auto mt-40 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        PLEASE, CONFIRM DETAILS
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">
              Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">
              Email: <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">
              Phone: <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select className="p-2 border rounded-l bg-white">
                <option value="+84">🇻🇳 +84</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                className="flex-1 p-2 border-l-0 border rounded-r focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Booking Details */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Thông tin đặt chỗ</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600">Ngày:</span>
                {/* Hiển thị ngày từ selectedSlots */}
                <span className="font-medium pl-1">
                  {selectedSlots.length > 0 ? selectedSlots[0].date.toLocaleDateString() : 'Chưa chọn ngày'}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Giờ:</span>
                {/* Hiển thị giờ từ selectedSlots */}
                <span className="font-medium pl-1">
                  {selectedSlots.length > 0
                    ? selectedSlots.map(slot => slot.hour).join(', ')
                    : 'Chưa chọn giờ'}
                </span>

              </div>

            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                className="mt-1"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span className="text-sm">
                I agree with SimplyBook.me Terms & Conditions
                <span className="text-red-500">*</span>
              </span>
            </label>

            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="subscribeToPromotions"
                className="mt-1"
                checked={formData.subscribeToPromotions}
                onChange={handleChange}
              />
              <span className="text-sm">
                Subscribe to be one of first to receive our promotions, cool offers and get other relevant information.
              </span>
            </label>

            <div className="text-red-500 text-sm">
              {!formData.agreeToTerms && "Value is required and cannot be empty"}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Confirm booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
