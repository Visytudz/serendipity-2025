import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { TimelineNodeData } from '../../types';

interface Props {
  data: TimelineNodeData;
}

const FireworkNode: React.FC<Props> = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const placeholderUrl = `https://placehold.co/600x400/png?text=${data.imageAlt}`;

  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1025] to-[#2d1b4e] p-1 border border-purple-500/30">
      <div className="relative z-10 bg-black/40 p-6 rounded-lg backdrop-blur-sm text-center">
        <div className="w-full h-48 mb-4 rounded overflow-hidden">
            <img 
                src={data.image || placeholderUrl} 
                alt={data.imageAlt}
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = placeholderUrl;
                }}
            />
        </div>
        <h3 className="text-xl font-serif text-purple-200 mb-2">{data.title}</h3>
        <p 
          className="font-serif font-light text-gray-300 leading-loose"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></p>
      </div>
      
      {/* Decorative Stars */}
      <motion.div 
         animate={{ opacity: [0.2, 1, 0.2] }}
         transition={{ duration: 2, repeat: Infinity }}
         className="absolute top-4 left-4 text-yellow-200 text-xs"
      >✦</motion.div>
       <motion.div 
         animate={{ opacity: [0.2, 1, 0.2] }}
         transition={{ duration: 3, repeat: Infinity, delay: 1 }}
         className="absolute bottom-10 right-10 text-yellow-200 text-sm"
      >✦</motion.div>
    </div>
  );
};

export default FireworkNode;