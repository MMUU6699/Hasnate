import React, { useMemo } from 'react';
import { useDownloads } from '../hooks/useDownloads';
import { useAudio } from '../hooks/useAudio';
import { DownloadedAudioTrack, Qari, SurahInfo } from '../types';
import { qaris } from '../data/qaris';
import { surahList } from '../data/quranMeta';
import { Link } from 'react-router-dom';

const DownloadsPage: React.FC = () => {
  const { downloadedTracks, deleteTrack } = useDownloads();
  const { playTrack, currentTrack, isPlaying } = useAudio();

  const tracksByQari = useMemo(() => {
    const grouped: Record<string, DownloadedAudioTrack[]> = {};
    Object.values(downloadedTracks).forEach(track => {
      if (!grouped[track.qariId]) {
        grouped[track.qariId] = [];
      }
      grouped[track.qariId].push(track);
      // Sort surahs by number
      grouped[track.qariId].sort((a, b) => a.surahNumber - b.surahNumber);
    });
    return grouped;
  }, [downloadedTracks]);
  
  const qariListWithDownloads = qaris.filter(q => tracksByQari[q.id]);

  const handlePlayTrack = (track: DownloadedAudioTrack) => {
    const qari = qaris.find(q => q.id === track.qariId);
    const surah = surahList.find(s => s.number === track.surahNumber);
    if (qari && surah) {
      playTrack(qari, surah);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-teal-800 dark:text-teal-300">المكتبة</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">استمع إلى السور التي نزلتها بدون الحاجة للإنترنت.</p>
      </div>

      {qariListWithDownloads.length === 0 ? (
        <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg">
          <i className="ph-fill ph-download-simple text-6xl text-gray-400 dark:text-gray-500 mb-4"></i>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">مكتبتك فارغة</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            اذهب إلى <Link to="/audio-player" className="text-teal-600 hover:underline font-semibold">مشغل القرآن</Link> لتنزيل بعض السور.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {qariListWithDownloads.map(qari => (
            <div key={qari.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center">
                <img src={qari.imageUrl} alt={qari.name} className="w-12 h-12 rounded-full object-cover ml-4"/>
                <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300">{qari.name}</h3>
              </div>
              <ul>
                {tracksByQari[qari.id].map(track => {
                  const isActive = currentTrack?.surahNumber === track.surahNumber && currentTrack?.qariId === track.qariId;
                  return (
                    <li key={track.key} className="flex items-center border-t dark:border-gray-700">
                      <button
                        onClick={() => handlePlayTrack(track)}
                        className={`flex-grow text-right p-4 transition-colors duration-200 flex justify-between items-center ${isActive ? 'bg-teal-100 dark:bg-teal-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
                      >
                         <p className="font-bold text-gray-800 dark:text-gray-200">{track.surahName}</p>
                         <i className={`ph-fill ${isActive && isPlaying ? 'ph-pause-circle' : 'ph-play-circle'} text-3xl text-teal-500`}></i>
                      </button>
                      <div className="px-4">
                        <button
                            onClick={() => deleteTrack(track.key)}
                            className="p-2 rounded-full text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50"
                            aria-label="حذف"
                        >
                            <i className="ph-fill ph-trash text-2xl"></i>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;