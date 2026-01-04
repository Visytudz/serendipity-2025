import React from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-pink-400 transition-opacity duration-1000">
      <div className="relative">
        <i className="fas fa-heart text-6xl animate-pulse-slow drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]"></i>
      </div>
      <p className="mt-6 text-lg font-serif tracking-widest text-slate-300 animate-pulse">
        正在载入我们的回忆...
      </p>
    </div>
  );
};

export default LoadingScreen;