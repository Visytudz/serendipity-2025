import React, { useRef, useEffect, useState } from 'react';
import { TimelineNodeData } from '../../types';

interface Props {
  data: TimelineNodeData;
}

const FogReveal: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize Canvas with correct size and DPR
    const initCanvas = () => {
      // If revealed, we don't need to redraw the fog
      if (isRevealed) return;

      const { offsetWidth, offsetHeight } = container;
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas dimensions considering High DPI
      canvas.width = offsetWidth * dpr;
      canvas.height = offsetHeight * dpr;
      
      // Normalize coordinate system to use CSS pixels
      ctx.scale(dpr, dpr);
      
      // Fill the fog
      ctx.fillStyle = '#9ca3af'; // Gray-400
      ctx.fillRect(0, 0, offsetWidth, offsetHeight);
      
      // Draw instruction text
      ctx.fillStyle = '#4b5563';
      ctx.font = '20px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("擦拭迷雾看清真相", offsetWidth / 2, offsetHeight / 2);
    };

    // Observe container resize to update canvas
    const resizeObserver = new ResizeObserver(() => {
        initCanvas();
    });
    resizeObserver.observe(container);

    // Initial draw
    initCanvas();

    // Interaction Logic
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
      ctx.arc(x, y, 30, 0, Math.PI * 2); // Increased brush size slightly
      ctx.fill();
    };

    const handleStart = (e: MouseEvent | TouchEvent) => { 
        isDrawing = true; 
        const { x, y } = getPos(e);
        scratch(x, y);
    };
    const handleEnd = () => { isDrawing = false; };
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    // Event Listeners with passive: false for touch to prevent scrolling
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('touchmove', handleMove, { passive: false });

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('touchstart', handleStart);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('touchmove', handleMove);
    };
  }, [isRevealed]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg bg-warm-800 border border-warm-700 select-none"
    >
      {/* Content Behind Fog - Relative positioning with min-height allows it to dictate container size */}
      <div className="relative z-0 p-10 flex flex-col items-center justify-center text-center min-h-[420px]">
        <div className="mb-6 text-love-400">
             <i className="fas fa-cloud-moon text-4xl"></i>
        </div>
        <div 
          className="font-serif font-light text-gray-200 leading-loose text-lg"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </div>

      {/* Fog Canvas - Absolute to cover the relative content */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 z-10 touch-none cursor-grab active:cursor-grabbing transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default FogReveal;