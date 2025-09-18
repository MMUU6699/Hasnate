import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587425878433-13651588865c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyMTg0NjQ0N3w&ixlib=rb-4.0.3&q=80&w=1920')" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="text-7xl font-bold text-teal-300 font-arabic">حسناتي</h1>
        <p className="text-teal-100 mt-2 text-xl">طريقك إلى الطمأنينة والسكينة</p>
        <div className="mt-16">
            <div className="w-10 h-10 border-2 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
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
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;