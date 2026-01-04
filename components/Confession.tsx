import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFESSION_TEXT } from '../constants';

interface Props {
    isActive: boolean;
}

const Confession: React.FC<Props> = ({ isActive }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [noBtnText, setNoBtnText] = useState("再想一想");
  const [success, setSuccess] = useState(false);

  const handleYesClick = () => {
    setSuccess(true);
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleNoInteraction = () => {
    const x = Math.random() * 200 - 100; // Random x between -100 and 100
    const y = Math.random() * 200 - 100; // Random y between -100 and 100
    setNoBtnPosition({ x, y });
    
    if (noBtnText === "再想一想") setNoBtnText("再给你一次机会");
    else if (noBtnText === "再给你一次机会") setNoBtnText("快点答应");
    else setNoBtnText("别闹了快点");
  };

  if (success) {
      return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-love-900/20 text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-6"
              >
                  ❤️
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">余生请多指教</h1>
              <p className="text-love-200 font-serif">Our story continues...</p>
          </div>
      )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Spotlight Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none"></div>
      
      <motion.div 
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
           hidden: { opacity: 0, y: 30 },
           visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } }
        }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        <div 
            className="mb-12 font-serif font-light text-lg md:text-xl text-gray-300 leading-loose"
            dangerouslySetInnerHTML={{ __html: CONFESSION_TEXT }}
        >
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 h-40">
            
            {/* YES Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ["0 0 0px rgba(244,63,94,0)", "0 0 20px rgba(244,63,94,0.5)", "0 0 0px rgba(244,63,94,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={handleYesClick}
                className="px-12 py-4 bg-love-500 hover:bg-love-600 text-white text-xl font-bold rounded-full shadow-lg transition-colors z-20 font-serif"
            >
                我愿意
            </motion.button>

            {/* NO Button (Runaway) */}
            <motion.button
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction} // Mobile support
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors z-10 font-serif"
            >
                {noBtnText}
            </motion.button>

        </div>
      </motion.div>
    </div>
  );
};

export default Confession;