import React, { useRef, useEffect, useState } from 'react';
import { TimelineData } from '../../types';

interface Props {
  data: TimelineData;
}

const FogScratch: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Handle Retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Fill with "Fog"
    ctx.fillStyle = '#94a3b8'; // Slate-400
    ctx.fillRect(0, 0, width, height);
    
    // Add some noise/texture to fog
    for(let i=0; i<500; i++) {
        ctx.fillStyle = `rgba(255,255,255, ${Math.random() * 0.2})`;
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Text hint
    ctx.fillStyle = '#1e293b';
    ctx.font = '20px serif';
    ctx.textAlign = 'center';
    ctx.fillText("擦拭迷雾 (Rub to reveal)", width / 2, height / 2);

    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; // Relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height;

    // Since we scaled context for DPR, we need to adjust inputs relative to element
    // but the drawing happens on the scaled context.
    // Simpler approach for erasing: 
    // The context is scaled by DPR. The coordinates (x - rect.left) are CSS pixels.
    // We want to draw circles.
    
    ctx.beginPath();
    ctx.arc((x - rect.left), (y - rect.top), 25, 0, Math.PI * 2);
    ctx.fill();

    // Check if mostly revealed (optimization: only check every few scratches or use state to stop checking)
    if (!isRevealed) {
        setIsRevealed(true); // Just trigger once user engages
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only if left mouse button is down
    scratch(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl font-serif text-slate-400 mb-4 text-center">{data.title}</h3>
      <div 
        ref={containerRef}
        className="relative w-full h-64 bg-slate-800 rounded-lg overflow-hidden shadow-inner border border-slate-700"
      >
        {/* Content Underneath */}
        <div className="absolute inset-0 p-6 flex items-center justify-center select-none">
          <p className="font-serif text-slate-200 leading-relaxed text-center">
            {data.content}
          </p>
        </div>

        {/* Fog Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair touch-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={(e) => scratch(e.clientX, e.clientY)}
          onTouchStart={(e) => {
             const t = e.touches[0];
             scratch(t.clientX, t.clientY);
          }}
        />
      </div>
    </div>
  );
};

export default FogScratch;