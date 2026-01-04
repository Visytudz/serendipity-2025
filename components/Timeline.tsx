import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_DATA } from '../constants';
import TimelineNode from './TimelineNode';
import Confession from './Confession';

const Timeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = TIMELINE_DATA.length + 1; // Nodes + Confession
  const touchStartY = useRef<number | null>(null);

  // Prevent default scroll behavior on wheel/touch
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.body.removeEventListener('touchmove', preventDefault);
  }, []);

  const goToNext = () => {
    if (activeIndex < totalSlides - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // Swipe Up (Next)
    if (diff > 50) {
      goToNext();
    }
    // Swipe Down (Prev)
    else if (diff < -50) {
      goToPrev();
    }
    touchStartY.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Simple debounce/threshold for wheel to prevent rapid skipping
    if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) goToNext();
        else goToPrev();
    }
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-warm-900"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Slider Container */}
      <motion.div 
        className="w-full h-full"
        animate={{ translateY: `-${activeIndex * 100}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Custom easing for smooth feel
      >
        {/* Render Timeline Nodes */}
        {TIMELINE_DATA.map((node, index) => (
          <div key={node.id} className="w-screen h-screen flex-shrink-0 relative">
             <TimelineNode 
                data={node} 
                isActive={activeIndex === index} 
                index={index} 
             />
          </div>
        ))}

        {/* Render Confession as the last slide */}
        <div className="w-screen h-screen flex-shrink-0 relative">
          <Confession isActive={activeIndex === totalSlides - 1} />
        </div>
      </motion.div>

      {/* Progress Dots (Optional, visual aid) */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-40">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i === activeIndex ? 'bg-love-500' : 'bg-gray-600'}`}
            animate={{ scale: i === activeIndex ? 1.5 : 1 }}
          />
        ))}
      </div>

      {/* Next Arrow Button */}
      <AnimatePresence>
        {activeIndex < totalSlides - 1 && (
          <motion.button
            key="next-arrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-love-200/50 hover:text-love-500 transition-colors p-4"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <i className="fas fa-chevron-down text-3xl"></i>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;