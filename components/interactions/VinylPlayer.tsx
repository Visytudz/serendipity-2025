import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineNodeData } from '../../types';

interface Props {
  data: TimelineNodeData;
}

const VinylPlayer: React.FC<Props> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer mb-8 group"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* Vinyl Disc */}
        <motion.div
          className="w-full h-full rounded-full bg-black border-4 border-gray-800 shadow-2xl relative flex items-center justify-center overflow-hidden"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear",  }}
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        >
            {/* Vinyl grooves effect */}
            <div className="absolute inset-2 rounded-full border border-gray-800 opacity-50"></div>
            <div className="absolute inset-8 rounded-full border border-gray-800 opacity-50"></div>
            <div className="absolute inset-16 rounded-full border border-gray-800 opacity-50"></div>
            
            {/* Center Label */}
            <div className="w-1/3 h-1/3 bg-love-500 rounded-full flex items-center justify-center relative z-10 shadow-inner">
               <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
        </motion.div>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 rounded-full backdrop-blur-sm transition-opacity group-hover:bg-black/20">
            <i className="fas fa-play text-white text-4xl opacity-80"></i>
          </div>
        )}
        
        {/* Tone Arm (Decorative) */}
        <motion.div 
            className="absolute -top-4 -right-4 w-24 h-40 pointer-events-none origin-top-right z-30"
            animate={{ rotate: isPlaying ? 25 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-4 h-4 bg-gray-400 rounded-full absolute top-0 right-0 shadow-lg"></div>
            <div className="w-1 h-32 bg-gray-300 absolute top-2 right-2 transform -rotate-12 origin-top"></div>
            <div className="w-8 h-12 bg-gray-700 absolute bottom-0 left-4 rounded-sm transform rotate-12"></div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-warm-800 p-6 rounded-lg shadow-lg border border-warm-700 max-w-md"
          >
             <div className="flex items-center gap-3 mb-4 text-love-400">
                <i className="fas fa-music"></i>
                <span className="text-xs uppercase tracking-widest">Now Playing: Frequency</span>
             </div>
             <p 
               className="font-serif font-light text-gray-300 leading-loose"
               dangerouslySetInnerHTML={{ __html: data.content }}
             ></p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isPlaying && (
         <p className="text-gray-500 text-sm animate-pulse font-light">点击唱片播放记忆</p>
      )}
    </div>
  );
};

export default VinylPlayer;