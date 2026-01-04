import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isPlaying: boolean;
  togglePlay: () => void;
}

const MusicControl: React.FC<Props> = ({ isPlaying, togglePlay }) => {
  return (
    <motion.button
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-love-100 shadow-lg"
      onClick={togglePlay}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <i className={`fas fa-${isPlaying ? 'compact-disc' : 'play'} text-xl`}></i>
      </motion.div>
      {/* Decorative pulse if playing */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border border-love-500/50 animate-ping"></span>
      )}
    </motion.button>
  );
};

export default MusicControl;