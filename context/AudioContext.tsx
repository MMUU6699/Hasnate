import React, { createContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import { AudioTrack, Qari, SurahInfo } from '../types';
import { qaris } from '../data/qaris';
import { surahList } from '../data/quranMeta';
import { useDownloads } from '../hooks/useDownloads';

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playTrack: (qari: Qari, surah: SurahInfo) => void;
  togglePlayPause: () => void;
  closePlayer: () => void;
  seek: (time: number) => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Helper to get the global starting ayah number for any surah.
const surahStartIndices: number[] = [0]; // Dummy value for index 0
let cumulativeAyahs = 0;
for (let i = 0; i < surahList.length; i++) {
    surahStartIndices.push(cumulativeAyahs + 1);
    cumulativeAyahs += surahList[i].numberOfAyahs;
}
const getSurahStartAyahIndex = (surahNumber: number): number => {
    if (surahNumber < 1 || surahNumber > 114) return 0;
    return surahStartIndices[surahNumber];
};


interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { getTrack } = useDownloads();
  const playTrackRef = useRef((_qari: Qari, _surah: SurahInfo) => {});


  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      playlist.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url); });
      audioRef.current.src = '';
    }
    setCurrentTrack(null);
    setIsPlaying(false);
    setPlaylist([]);
    setIsPlaylist(false);
    setCurrentPlaylistIndex(0);
  }, [playlist]);

  const playNextSurah = useCallback(async () => {
    if (!currentTrack) return;
    const nextSurahNumber = currentTrack.surahNumber + 1;
    if (nextSurahNumber > 114) {
      closePlayer();
      return;
    }
    const currentQari = qaris.find(q => q.id === currentTrack.qariId);
    const nextSurahInfo = surahList.find(s => s.number === nextSurahNumber);

    if (currentQari && nextSurahInfo) {
      await playTrackRef.current(currentQari, nextSurahInfo);
    }
  }, [currentTrack, closePlayer]);

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    
    const onTimeUpdate = () => setProgress(audio.currentTime || 0);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
        if (isPlaylist && currentPlaylistIndex < playlist.length - 1) {
            setCurrentPlaylistIndex(prev => prev + 1);
        } else {
            playNextSurah();
        }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    }
  }, [playNextSurah, playlist, currentPlaylistIndex, isPlaylist]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (currentTrack && playlist.length > 0 && playlist[currentPlaylistIndex]) {
        const audioUrl = playlist[currentPlaylistIndex];
        
        // Update track info for playlists
        if (isPlaylist) {
            setCurrentTrack(prev => prev ? ({ ...prev, ayahNumberInSurah: currentPlaylistIndex + 1 }) : null);
        }

        if (audio.src !== audioUrl) {
            audio.src = audioUrl;
            setProgress(0);
        }
        if (isPlaying) {
            audio.play().catch(e => {
                console.error("Audio play failed:", e);
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    } else {
        audio.pause();
        audio.src = '';
    }
  }, [currentTrack?.surahNumber, currentTrack?.qariId, isPlaying, playlist, currentPlaylistIndex, isPlaylist]);
  
  const playTrack = useCallback(async (qari: Qari, surah: SurahInfo) => {
    const key = `${qari.id}_${surah.number}`;
    
    if (currentTrack && currentTrack.qariId === qari.id && currentTrack.surahNumber === surah.number) {
        togglePlayPause();
        return;
    }
    
    playlist.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url); });

    const newTrackData: AudioTrack = {
        qariId: qari.id,
        qariName: qari.name,
        surahNumber: surah.number,
        surahName: surah.name,
        audioUrl: '', // Will be set below
    };

    let newPlaylist: string[] = [];
    let isAyahPlaylist = false;

    if (qari.apiProvider === 'alquran.cloud' && qari.edition) {
        const startAyah = getSurahStartAyahIndex(surah.number);
        for (let i = 0; i < surah.numberOfAyahs; i++) {
            const globalAyahNumber = startAyah + i;
            newPlaylist.push(`https://cdn.islamic.network/quran/audio/128/${qari.edition}/${globalAyahNumber}.mp3`);
        }
        isAyahPlaylist = true;
        newTrackData.ayahNumberInSurah = 1;
    } else {
        const localTrackData = await getTrack(key);
        let urlToPlay: string;
        if (localTrackData) {
            urlToPlay = URL.createObjectURL(localTrackData.audioBlob);
        } else {
            urlToPlay = `${qari.server}/${qari.path}/${String(surah.number).padStart(3, '0')}.mp3`;
        }
        newPlaylist.push(urlToPlay);
        newTrackData.audioUrl = urlToPlay;
        isAyahPlaylist = false;
    }

    setCurrentTrack(newTrackData);
    setPlaylist(newPlaylist);
    setIsPlaylist(isAyahPlaylist);
    setCurrentPlaylistIndex(0);
    setIsPlaying(true);
  }, [currentTrack, getTrack, playlist]);

  playTrackRef.current = playTrack;

  const togglePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(prev => !prev);
    }
  };
  
  const seek = (time: number) => {
    if (audioRef.current && isFinite(time)) {
        audioRef.current.currentTime = time;
    }
  };

  const value = {
    currentTrack,
    isPlaying,
    progress,
    duration,
    playTrack,
    togglePlayPause,
    closePlayer,
    seek,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};