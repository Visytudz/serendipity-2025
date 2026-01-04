import React, { useState } from 'react';
import { TimelineData } from '../../types';

interface Props {
  data: TimelineData;
}

const Vinyl: React.FC<Props> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer transition-transform hover:scale-105"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* Record Sleeve / Background */}
        <div className="absolute inset-0 rounded-full bg-black shadow-2xl border-4 border-slate-800 flex items-center justify-center overflow-hidden">
             {/* Vinyl Grooves */}
             <div className={`w-full h-full rounded-full border-[20px] border-slate-900 ${isPlaying ? 'animate-spin-slow' : ''}`} 
                  style={{ background: 'conic-gradient(from 0deg, #111, #333, #111)' }}>
                  {/* Label */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center border-4 border-slate-900">
                    <i className={`fas fa-music text-white text-xl ${isPlaying ? 'animate-bounce' : ''}`}></i>
                  </div>
             </div>
        </div>
        
        {/* Play Icon Overlay (only when stopped) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full backdrop-blur-[2px]">
            <i className="fas fa-play text-white text-4xl opacity-80"></i>
          </div>
        )}
      </div>

      <div className={`mt-8 max-w-md text-center transition-all duration-1000 ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h3 className="text-xl font-serif text-pink-300 mb-3">{data.title}</h3>
        <p className="text-slate-300 leading-relaxed font-serif">
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default Vinyl;