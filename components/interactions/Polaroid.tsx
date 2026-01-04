import React, { useState } from 'react';
import { TimelineData } from '../../types';

interface Props {
  data: TimelineData;
}

const Polaroid: React.FC<Props> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto h-96 perspective-1000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front */}
        <div className="absolute w-full h-full bg-white p-4 shadow-xl rounded-sm backface-hidden flex flex-col items-center">
          <div className="w-full h-64 overflow-hidden bg-gray-200 mb-4 border border-gray-100">
             <img 
               src={`https://placehold.co/600x400/png?text=${data.imageAlt}`} 
               alt="Memory" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="flex-1 flex items-center justify-center">
             <h3 className="font-serif text-2xl text-slate-800 tracking-widest">{data.date}</h3>
          </div>
          <p className="text-xs text-slate-400 mt-2">点击翻转回忆</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-pink-50 p-6 shadow-xl rounded-sm backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center border-4 border-white">
          <div className="mb-4 text-pink-500">
            <i className="fas fa-quote-left text-2xl"></i>
          </div>
          <p className="font-serif text-slate-700 leading-relaxed text-sm md:text-base">
            {data.content}
          </p>
          <div className="mt-4 text-pink-500">
            <i className="fas fa-quote-right text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Polaroid;