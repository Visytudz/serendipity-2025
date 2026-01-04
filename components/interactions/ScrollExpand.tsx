import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineNodeData } from '../../types';

interface Props {
  data: TimelineNodeData;
}

const ScrollExpand: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header / Closed State */}
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#f5e6d3] text-[#5c4a3d] p-4 rounded-lg shadow-md cursor-pointer flex items-center justify-between border-2 border-[#d4c5b0]"
      >
         <div className="flex items-center gap-4">
             <div className="bg-[#5c4a3d] text-[#f5e6d3] w-10 h-10 rounded-full flex items-center justify-center">
                 <i className="fas fa-map-marker-alt"></i>
             </div>
             <h3 className="font-serif font-bold text-xl">{data.title}</h3>
         </div>
         <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
         >
             <i className="fas fa-chevron-down"></i>
         </motion.div>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#fffdf5] mx-2 p-6 border-x-2 border-b-2 border-[#d4c5b0] rounded-b-lg relative">
                {/* Decorative Scroll patterns */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/5 to-transparent"></div>
                
                <img 
                    src={data.image || `https://placehold.co/600x400/png?text=${data.imageAlt}`} 
                    alt={data.imageAlt}
                    className="w-full h-48 object-cover rounded mb-4 sepia opacity-90"
                />

                <p 
                  className="font-serif font-light text-[#5c4a3d] leading-loose text-lg"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                ></p>
                
                <div className="mt-4 flex justify-center">
                    <i className="fas fa-snowflake text-love-300 opacity-50 text-xl"></i>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollExpand;