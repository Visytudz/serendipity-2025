import React, { useState } from 'react';
import { TimelineData } from '../../types';

interface Props {
  data: TimelineData;
}

const ScrollMap: React.FC<Props> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-[#f2eecb] text-slate-800 rounded-lg shadow-lg cursor-pointer overflow-hidden transition-all duration-700 ease-in-out relative border-t-8 border-b-8 border-red-800"
        style={{ 
            maxHeight: isExpanded ? '500px' : '80px',
            backgroundImage: 'repeating-linear-gradient(#f2eecb 0px, #f2eecb 24px, #e0dcbf 25px)'
        }}
      >
        {/* Header (Always Visible) */}
        <div className="h-20 flex items-center justify-between px-6 bg-red-900/10">
           <h3 className="text-xl font-bold font-serif text-red-900">{data.title}</h3>
           <i className={`fas fa-chevron-down text-red-900 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}></i>
        </div>

        {/* Hidden Content */}
        <div className="p-6 opacity-90">
           <img 
               src={`https://placehold.co/600x400/png?text=${data.imageAlt}`} 
               alt="Date" 
               className="w-full h-40 object-cover rounded-md mb-4 sepia opacity-80"
           />
           <p className="font-serif text-slate-900 leading-7 font-medium">
             {data.content}
           </p>
           <div className="mt-4 text-right">
              <span className="font-handwriting text-red-800">- {data.date}</span>
           </div>
        </div>
      </div>
      {!isExpanded && (
          <p className="text-center text-xs text-slate-500 mt-2 animate-bounce">点击展开画卷</p>
      )}
    </div>
  );
};

export default ScrollMap;