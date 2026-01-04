import React, { useState } from 'react';
import { TimelineData } from '../../types';

interface Props {
  data: TimelineData;
}

const GiftBox: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-8">
        {/* Gift Box Container */}
        <div 
            className="w-full h-full flex items-center justify-center cursor-pointer group"
            onClick={() => setIsOpen(true)}
        >
            {/* The Actual Box - hidden when open */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100 hover:animate-wiggle'}`}>
                <i className="fas fa-gift text-9xl text-pink-500 drop-shadow-lg"></i>
                <div className="absolute -bottom-4 text-sm text-slate-400">点击拆开礼物</div>
            </div>

            {/* Exploded Content - shown when open */}
            <div className={`absolute inset-0 bg-white rounded-lg p-4 shadow-2xl flex flex-col items-center justify-center text-center transition-all duration-700 transform ${isOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-45'}`}>
                 <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                    <i className="fas fa-heart text-pink-500 text-2xl animate-pulse"></i>
                 </div>
                 <h4 className="font-bold text-slate-800 mb-1">{data.title}</h4>
                 <div className="text-xs text-slate-500 overflow-y-auto max-h-24">
                     (巧克力 & 抓大鹅回忆)
                 </div>
            </div>
        </div>
      </div>

      {/* Narrative Text */}
      <div className={`transition-all duration-1000 delay-300 max-w-md text-center p-4 rounded-xl border border-pink-500/20 bg-pink-900/10 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-serif text-slate-200 leading-relaxed">
             {data.content}
          </p>
      </div>
    </div>
  );
};

export default GiftBox;