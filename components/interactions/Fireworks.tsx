import React, { useEffect, useRef } from 'react';
import { TimelineData } from '../../types';

interface Props {
  data: TimelineData;
}

const Fireworks: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const colors = ['#f472b6', '#fbbf24', '#60a5fa', '#34d399'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 100;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 3 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravity
        this.life--;
        this.size *= 0.96;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const fire = () => {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        // create explosion at random height
        const targetY = canvas.height * 0.2 + Math.random() * (canvas.height * 0.5);
        
        // Simulating immediate explosion for visual effect in this simplified version
        for(let i=0; i<30; i++) {
            particles.push(new Particle(x, targetY));
        }
    };

    let animationId: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if(frame % 60 === 0) fire();

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      frame++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
      
      <div className="relative z-10 p-8 text-center">
        <h3 className="text-2xl font-serif text-yellow-400 mb-4 drop-shadow-lg">{data.title}</h3>
        <p className="font-serif text-slate-100 leading-relaxed mb-6">
          {data.content}
        </p>
        <img 
            src={`https://placehold.co/600x400/png?text=${data.imageAlt}`} 
            alt="New Year" 
            className="w-full max-w-xs mx-auto rounded-lg shadow-2xl border-2 border-yellow-500/30"
        />
      </div>
    </div>
  );
};

export default Fireworks;