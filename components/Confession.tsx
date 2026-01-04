import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFESSION_TEXT } from '../constants';

interface Props {
    isActive: boolean;
}

const Confession: React.FC<Props> = ({ isActive }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [noBtnText, setNoBtnText] = useState("再想一想");
  const [success, setSuccess] = useState(false);
  const [alternativeEnding, setAlternativeEnding] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const MAX_MOVES = 5; // How many times it runs away before giving up

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
    // If we reached the max moves, stop moving and allow click
    if (moveCount >= MAX_MOVES) {
        return;
    }

    const x = Math.random() * 200 - 100; // Random x between -100 and 100
    const y = Math.random() * 200 - 100; // Random y between -100 and 100
    setNoBtnPosition({ x, y });
    setMoveCount(prev => prev + 1);
    
    // Update text based on attempts
    if (moveCount === 0) setNoBtnText("再给你一次机会");
    else if (moveCount === 1) setNoBtnText("快点答应");
    else if (moveCount === 2) setNoBtnText("别闹了快点");
    else if (moveCount === 3) setNoBtnText("真不答应？");
    else if (moveCount === 4) setNoBtnText("好吧...点这里"); // Stop moving text
  };

  const handleNoClick = () => {
      if (moveCount >= MAX_MOVES) {
          setAlternativeEnding(true);
      }
  };

  // 1. Success Screen (YES)
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

  // 2. Alternative Ending Screen (NO -> Accepted)
  if (alternativeEnding) {
      return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] text-center p-8 relative overflow-hidden">
              {/* Starry Background Effect */}
              <div className="absolute inset-0 z-0">
                  {[...Array(20)].map((_, i) => (
                      <motion.div
                          key={i}
                          className="absolute bg-white rounded-full opacity-70"
                          style={{
                              width: Math.random() * 2 + 1 + 'px',
                              height: Math.random() * 2 + 1 + 'px',
                              top: Math.random() * 100 + '%',
                              left: Math.random() * 100 + '%',
                          }}
                          animate={{ opacity: [0.2, 0.8, 0.2] }}
                          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                      />
                  ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col items-center"
              >
                  {/* Moon Icon */}
                  <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-tr from-yellow-100 to-yellow-50 shadow-[0_0_30px_rgba(254,243,199,0.3)] flex items-center justify-center">
                     <div className="w-20 h-20 bg-[#050505] rounded-full translate-x-3 -translate-y-1"></div>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-serif text-gray-200 mb-6 tracking-widest">
                      谢谢你的陪伴
                  </h1>
                  
                  <div className="h-px w-24 bg-gray-700 mb-6"></div>

                  <p className="text-gray-400 font-serif leading-loose max-w-md">
                      如果这只是一段路过的风景，<br/>
                      那也一定是我最想收藏的画面。<br/>
                      无论身份如何变化，<br/>
                      <strong>我都希望你拥有最灿烂的晴天。</strong>
                  </p>

                  <motion.button 
                    onClick={() => window.location.reload()}
                    className="mt-12 text-xs text-gray-600 hover:text-gray-400 transition-colors tracking-widest uppercase border-b border-transparent hover:border-gray-600"
                  >
                      Replay Memory
                  </motion.button>
              </motion.div>
          </div>
      )
  }

  // 3. Default Confession Screen
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

            {/* NO Button (Runaway -> Clickable) */}
            <motion.button
                animate={{ 
                    x: moveCount >= MAX_MOVES ? 0 : noBtnPosition.x, 
                    y: moveCount >= MAX_MOVES ? 0 : noBtnPosition.y,
                    backgroundColor: moveCount >= MAX_MOVES ? '#4b5563' : '#374151'
                }}
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction} 
                onClick={handleNoClick}
                className={`px-8 py-3 text-gray-300 text-sm rounded-full transition-all z-10 font-serif ${moveCount >= MAX_MOVES ? 'cursor-pointer hover:bg-gray-500' : 'cursor-default'}`}
            >
                {noBtnText}
            </motion.button>

        </div>
      </motion.div>
    </div>
  );
};

export default Confession;