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

  useEffect(() => {
    // Send notification to DingTalk on page load
    const sendDingTalkNotification = async () => {
      const webhook = "https://oapi.dingtalk.com/robot/send?access_token=90c0ca9d5aeb7ecf76029a737fe270adb70e6aefa3d1ab32c290f6d0d46d3702";

      let clientInfo: any = {
        ip: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        org: 'Unknown',
      };

      try {
        // 尝试获取详细 IP 地理位置信息 (使用 ipapi.co)
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          clientInfo = {
            ip: data.ip || 'Unknown',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            country: data.country_name || 'Unknown',
            org: data.org || 'Unknown',
          };
        }
      } catch (e) {
        console.warn('Failed to fetch IP details', e);
      }

      const message = [
        `🔔 [新访问] Serendipity-2025`,
        `--------------------------------`,
        `👤 IP信息`,
        `IP: ${clientInfo.ip}`,
        `位置: ${clientInfo.city}, ${clientInfo.region}, ${clientInfo.country}`,
        `ISP: ${clientInfo.org}`,
        `--------------------------------`,
        `💻 设备信息`,
        `平台: ${navigator.platform}`,
        `浏览器: ${navigator.userAgent}`,
        `语言: ${navigator.language}`,
        `屏幕: ${window.screen.width}x${window.screen.height}`,
        `--------------------------------`,
        `🔗 访问来源`,
        `URL: ${window.location.href}`,
        `Referrer: ${document.referrer || '直接访问'}`,
        `时间: ${new Date().toLocaleString()}`
      ].join('\n');

      try {
        await fetch(webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            msgtype: "text",
            text: {
              content: message
            }
          }),
        });
      } catch (error) {
        // Ignore errors to avoid affecting user experience
        console.warn('Notification skipped:', error);
      }
    };

    sendDingTalkNotification();
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