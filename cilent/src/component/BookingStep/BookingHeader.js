import React from 'react';

const BookingHeader = () => {
  const steps = [
    { 
      title: 'Service', 
      isActive: true,
      isCompleted: true,
      subtitle: 'Free introduction training'
    },
    { 
      title: 'Provider', 
      isActive: false,
      isCompleted: false,
      subtitle: ''
    },
    { 
      title: 'Time', 
      isActive: false,
      isCompleted: false,
      subtitle: ''
    },
    { 
      title: 'Client', 
      isActive: false,
      isCompleted: false,
      subtitle: ''
    }
  ];

  return (
    <nav className="w-full border-b border-gray-200">
      <div className="container mx-auto">
        <div className="relative">
          <ul className="flex items-center">
            {steps.map((step, index) => (
              <li 
                key={step.title}
                className={`relative flex-1 text-center ${
                  index < steps.length - 1 
                    ? 'border-r border-gray-200' 
                    : ''
                }`}
              >
                <a 
                  href="#" 
                  className={`relative block py-4 px-4 ${
                    step.isActive 
                      ? 'bg-white' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <div className={`text-sm ${
                      step.isActive || step.isCompleted
                        ? 'text-blue-600' 
                        : 'text-gray-600'
                    }`}>
                      {step.title}
                      {step.isCompleted && (
                        <span className="ml-2 text-green-500">✓</span>
                      )}
                    </div>
                    {step.subtitle && (
                      <div className="text-xs text-gray-500 mt-1">
                        {step.subtitle}
                      </div>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BookingHeader;