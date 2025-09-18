import React, { useState } from 'react';
import { useAuth } from '../App';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    // Simulate a network request
    setTimeout(() => {
      login();
      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565109259469-c2a4a41c14?q=80&w=1920&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>
      <div className="relative w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center animate-fade-in-up">
        <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl font-bold text-teal-700 dark:text-teal-300 font-arabic">حسناتي</h1>
            <p className="text-teal-600 dark:text-teal-400 mt-2">طريقك إلى الطمأنينة والسكينة</p>
        </div>
        
        <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-transform transform hover:scale-105 duration-300 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoggingIn ? <i className="ph ph-spinner animate-spin text-2xl"></i> : 'تسجيل الدخول / إنشاء حساب'}
            </button>
             <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-500 dark:text-gray-400">أو</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-transform transform hover:scale-105 duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isLoggingIn ? <i className="ph ph-spinner animate-spin text-xl"></i> : <><img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5" /><span>المتابعة باستخدام جوجل</span></>}
            </button>
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full bg-transparent border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 disabled:opacity-75"
            >
              {isLoggingIn ? <i className="ph ph-spinner animate-spin text-xl"></i> : 'المتابعة كضيف'}
            </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;