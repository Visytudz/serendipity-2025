import React, { useRef, useEffect, useState } from 'react';
import { TimelineNodeData } from '../../types';

interface Props {
  data: TimelineNodeData;
}

const FogReveal: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Fill with fog color
      ctx.fillStyle = '#9ca3af'; // Gray-400
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text hint
      ctx.fillStyle = '#4b5563';
      ctx.font = '20px serif';
      ctx.textAlign = 'center';
      ctx.fillText("擦拭迷雾看清真相", canvas.width / 2, canvas.height / 2);
    };

    resize();
    window.addEventListener('resize', resize);

    // Scratch logic
    let isDrawing = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;
      
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Check percentage cleared (simple debounce could be better, but this works for demo)
      // For performance, we don't check every pixel every frame in production, 
      // but here we'll just use a simple counter estimation or user interaction duration.
      // Simplified: Just fade out canvas if user interacts enough.
      setPercent(p => {
         const newP = p + 1.5;
         if (newP > 100 && !isRevealed) {
            setIsRevealed(true);
         }
         return newP;
      });
    };

    const handleStart = () => { isDrawing = true; };
    const handleEnd = () => { isDrawing = false; };
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault(); // Prevent scroll while scratching
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('touchstart', handleStart);
    
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('touchstart', handleStart);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('touchmove', handleMove);
    };
  }, [isRevealed]);

  return (
    <div className="relative w-full max-w-md mx-auto h-64 rounded-lg overflow-hidden shadow-lg bg-warm-800 border border-warm-700">
      {/* Content Behind Fog */}
      <div 
        ref={containerRef}
        className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center"
      >
        <div className="mb-4 text-love-400">
             <i className="fas fa-cloud-moon text-3xl"></i>
        </div>
        <p 
          className="font-serif font-light text-gray-200 leading-loose"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></p>
      </div>

      {/* Fog Canvas */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 z-10 touch-none cursor-grab active:cursor-grabbing transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />
    </div>
  );
};

export default FogReveal;