import React from 'react';
import { useAudio } from '../../hooks/useAudio';

const GlobalAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    closePlayer,
    progress,
    duration,
    seek,
  } = useAudio();

  if (!currentTrack) {
    return null;
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const trackDisplayName = currentTrack.ayahNumberInSurah
    ? `${currentTrack.surahName} (آية ${currentTrack.ayahNumberInSurah})`
    : currentTrack.surahName;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg-top z-50 animate-slide-up" dir='rtl'>
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
            {/* Track Info */}
            <div className="flex-1 min-w-0 mr-4">
                <p className="font-bold text-teal-800 dark:text-teal-300 truncate">{trackDisplayName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{currentTrack.qariName}</p>
            </div>
            
            {/* Controls */}
            <button onClick={togglePlayPause} className="p-3 rounded-full bg-teal-600 text-white shadow-md hover:bg-teal-700 transition-colors mx-4">
                <i className={`ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'} text-2xl`}></i>
            </button>

            {/* Progress Bar */}
            <div className="flex-1 flex items-center mx-4">
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{formatTime(progress)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="w-full h-1 mx-3 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
                />
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{formatTime(duration)}</span>
            </div>

            {/* Close Button */}
            <button onClick={closePlayer} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-2">
                <i className="ph-fill ph-x text-xl text-gray-600 dark:text-gray-300"></i>
            </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
        .animate-slide-up {
            animation: slide-up 0.3s ease-out forwards;
        }
        .shadow-lg-top {
            box-shadow: 0 -4px 15px -3px rgba(0, 0, 0, 0.1), 0 -2px 6px -2px rgba(0, 0, 0, 0.05);
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            background: #0d9488; /* teal-600 */
            cursor: pointer;
            border-radius: 50%;
        }
         input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: #0d9488; /* teal-600 */
            cursor: pointer;
            border-radius: 50%;
            border: none;
        }
      `}</style>
    </div>
  );
};

export default GlobalAudioPlayer;