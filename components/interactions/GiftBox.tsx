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
      <div className="relative w-64 h-64 flex items-center justify-center">
          
          {/* The Content Inside (Revealed when open) */}
          <motion.div
            className="absolute inset-0 bg-warm-800 rounded-lg p-6 border border-warm-700 flex flex-col items-center justify-center text-center shadow-inner z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
            transition={{ delay: 0.2 }}
          >
              <i className="fas fa-gamepad text-love-400 text-3xl mb-3"></i>
              <p 
                className="font-serif font-light text-sm md:text-base text-gray-200 leading-loose"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></p>
          </motion.div>

          {/* The Box Lid */}
          <motion.div
            className="absolute z-20 w-40 h-20 bg-love-500 rounded-sm top-[25%] cursor-pointer shadow-xl flex items-center justify-center"
            animate={isOpen ? { y: -120, opacity: 0 } : { y: 0, opacity: 1 }}
            whileHover={!isOpen ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
            onClick={() => setIsOpen(true)}
          >
              <div className="w-full h-4 bg-love-900 absolute top-8"></div>
              <div className="w-4 h-full bg-love-900 absolute left-18"></div>
              <div className="absolute -top-6 text-love-500 filter drop-shadow-lg">
                  <i className="fas fa-gift text-5xl"></i>
              </div>
          </motion.div>

          {/* The Box Body */}
          <motion.div
             className="absolute z-10 w-36 h-32 bg-love-600 rounded-b-lg top-[45%] shadow-2xl"
             animate={isOpen ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
          >
               <div className="w-4 h-full bg-love-900 mx-auto"></div>
          </motion.div>

          {!isOpen && (
            <p className="absolute -bottom-8 text-gray-500 text-sm animate-bounce font-light">点击拆开礼物</p>
          )}

      </div>
    </div>
  );
};

export default GiftBox;