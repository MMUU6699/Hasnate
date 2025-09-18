import React, { useState } from 'react';

const TasbihPage: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 w-full max-w-lg">
        <h2 className="text-4xl font-bold text-teal-800 dark:text-teal-300 mb-4">المسبحة الإلكترونية</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">انقر على الدائرة لبدء التسبيح</p>
        
        <div className="mb-10">
          <p className="text-8xl lg:text-9xl font-mono font-bold text-teal-600 dark:text-teal-400">{count}</p>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={increment}
            className="w-48 h-48 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
          >
            <i className="ph-fill ph-plus-circle text-6xl"></i>
          </button>
          
          <button
            onClick={reset}
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
          >
            <i className="ph-fill ph-arrow-counter-clockwise mr-2"></i>
            <span>إعادة تعيين</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasbihPage;