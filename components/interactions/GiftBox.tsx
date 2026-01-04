import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TimelineNodeData } from '../../types';

interface Props {
  data: TimelineNodeData;
}

const GiftBox: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {/* 1. Increased container size significantly: w-[340px] h-[480px] on mobile */}
      <div className="relative w-[300px] h-[430px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          
          {/* The Content Inside (Revealed when open) */}
          <motion.div
            className="absolute inset-0 bg-warm-800 rounded-xl p-8 md:p-12 border border-warm-700 flex flex-col items-center justify-center text-center shadow-inner z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
            transition={{ delay: 0.2 }}
          >
              <i className="fas fa-gamepad text-love-400 text-5xl md:text-6xl mb-6 md:mb-8"></i>
              <p 
                className="font-serif font-light text-lg md:text-2xl text-gray-200 leading-loose"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></p>
          </motion.div>

          {/* The Box Lid - Scaled up and adjusted position */}
          <motion.div
            className="absolute z-20 w-72 h-32 md:w-96 md:h-40 bg-love-500 rounded-sm top-[25%] cursor-pointer shadow-xl flex items-center justify-center"
            animate={isOpen ? { y: -260, opacity: 0 } : { y: 0, opacity: 1 }}
            whileHover={!isOpen ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
            onClick={() => setIsOpen(true)}
          >
              {/* Ribbon Horizontal */}
              <div className="w-full h-8 bg-love-900 absolute top-10 md:top-14"></div>
              {/* Ribbon Vertical */}
              <div className="w-8 h-full bg-love-900 absolute left-1/2 transform -translate-x-1/2"></div>
              {/* Bow */}
              <div className="absolute -top-12 md:-top-16 text-love-500 filter drop-shadow-lg transform scale-150 md:scale-[2]">
                  <i className="fas fa-gift text-7xl"></i>
              </div>
          </motion.div>

          {/* The Box Body - Scaled up and adjusted position */}
          <motion.div
             className="absolute z-10 w-64 h-56 md:w-80 md:h-72 bg-love-600 rounded-b-xl top-[40%] md:top-[38%] shadow-2xl"
             animate={isOpen ? { y: 260, opacity: 0 } : { y: 0, opacity: 1 }}
          >
               <div className="w-8 h-full bg-love-900 mx-auto"></div>
          </motion.div>

          {!isOpen && (
            <p className="absolute -bottom-8 md:-bottom-12 text-gray-400 text-base animate-bounce font-light tracking-widest">点击拆开礼物</p>
          )}

      </div>
    </div>
  );
};

export default GiftBox;