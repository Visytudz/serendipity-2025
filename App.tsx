import React, { useState, useRef, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Timeline from './components/Timeline';
import MusicControl from './components/MusicControl';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (audio) {
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        
        // Check initial state
        if (!audio.paused) setIsPlaying(true);
    }

    return () => {
        if (audio) {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        }
    };
  }, []);

  // Safe wrapper for audio actions to handle interruption errors
  const handleAudioAction = async (action: 'play' | 'pause') => {
      const audio = audioRef.current;
      if (!audio) return;

      try {
          if (action === 'play') {
              await audio.play();
          } else {
              audio.pause();
          }
      } catch (err: any) {
          // "AbortError" happens when play() is interrupted by pause().
          // This is expected behavior if the user toggles quickly, so we ignore it.
          if (err.name !== 'AbortError') {
              console.warn("Audio playback error:", err);
          }
      }
  };

  const startExperience = () => {
    setLoading(false);
    handleAudioAction('play');
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
        handleAudioAction('play');
    } else {
        handleAudioAction('pause');
    }
  };

  return (
    <div className="h-screen w-screen bg-warm-900 text-gray-100 selection:bg-love-500 selection:text-white overflow-hidden">
      {!loading && <MusicControl isPlaying={isPlaying} togglePlay={togglePlay} />}
      
      {loading ? (
        <LoadingScreen onStart={startExperience} />
      ) : (
        <Timeline />
      )}
    </div>
  );
};

export default App;