import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TimelineNodeData } from '../../types';

interface Props {
  data: TimelineNodeData;
}

const Polaroid: React.FC<Props> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto h-[450px] cursor-pointer perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 backface-hidden flex flex-col items-center justify-start p-4 bg-white shadow-xl rounded-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-[320px] overflow-hidden bg-gray-200 mb-6 border border-gray-100">
             {/* Placeholder Image: Replace text query for different images */}
            <img 
              src={`https://placehold.co/600x400/png?text=${data.imageAlt}`} 
              alt={data.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="font-serif text-3xl font-light text-gray-800 tracking-widest mt-2">
            {data.frontText || data.date}
          </div>
          <p className="text-gray-400 text-sm mt-2 font-serif italic font-light">点击翻转回忆</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#fffdf5] shadow-xl p-8 flex flex-col items-center justify-center text-center rounded-sm"
          style={{ backfaceVisibility: 'hidden', transform: "rotateY(180deg)" }}
        >
           <div className="absolute top-4 right-4 text-gray-300">
              <i className="fas fa-quote-right text-4xl opacity-20"></i>
           </div>
           <p 
             className="font-serif font-light text-gray-700 leading-loose text-lg"
             dangerouslySetInnerHTML={{ __html: data.content }}
           ></p>
           <div className="mt-6 w-12 h-1 bg-love-400 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Polaroid;