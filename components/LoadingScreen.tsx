import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [showButton, setShowButton] = useState(false);

  React.useEffect(() => {
    // Wait for the initial "loading" animation to feel "done" before showing the button
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-warm-900 text-love-100"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!showButton ? (
             <motion.div
                key="loading-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex flex-col items-center"
             >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="mb-6"
                >
                  <i className="fas fa-heart text-6xl text-love-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]"></i>
                </motion.div>
                <h2 className="font-serif text-xl tracking-widest font-light opacity-90">
                  正在载入我们的回忆...
                </h2>
                <div className="mt-4 w-48 h-1 bg-warm-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-love-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
             </motion.div>
          ) : (
            <motion.div
              key="start-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-3xl font-serif text-white mb-8 tracking-widest">
                我们的故事
              </h1>
              <motion.button
                onClick={onStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-love-900/50 border border-love-500/30 text-love-100 rounded-full font-serif tracking-widest hover:bg-love-900/80 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all"
              >
                开启回忆 <i className="fas fa-chevron-right ml-2 text-xs"></i>
              </motion.button>
              <p className="mt-4 text-xs text-gray-500 font-serif">
                开启声音体验更佳
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;