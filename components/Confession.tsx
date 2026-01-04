import React, { useState, useRef } from 'react';

const Confession: React.FC = () => {
  const [noBtnPosition, setNoBtnPosition] = useState({ top: '0px', left: '0px', position: 'static' as any });
  const [noBtnText, setNoBtnText] = useState("再想一想");
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRunaway = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width - 100;
    const maxY = 300; // Limit vertical movement

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setNoBtnPosition({
        position: 'absolute',
        top: `${randomY}px`,
        left: `${randomX}px`
    });

    const phrases = ["再给你一次机会", "真的不答应吗？", "快点答应", "别闹了点左边"];
    setNoBtnText(phrases[Math.floor(Math.random() * phrases.length)]);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
    // Simple confetti burst could be added here, but the UI change is sufficient
  };

  if (isSuccess) {
      return (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-900/95 text-white animate-fade-in px-4 text-center">
              <i className="fas fa-heart text-9xl text-red-500 animate-pulse mb-8 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]"></i>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">余生请多指教 ❤️</h1>
              <p className="text-xl opacity-80">故事刚刚开始...</p>
          </div>
      );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-20 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/30 via-transparent to-transparent"></div>
      
      <div className="max-w-xl mx-auto px-6 text-center z-10 relative">
        <div className="mb-12 font-serif text-slate-300 leading-8 text-lg md:text-xl space-y-6">
            <p>回顾了这么多，其实我一直想做一个‘贪心’的人。</p>
            <p>我不想只做那个给你送药的师兄，<br/>也不想只做那个陪你玩游戏的玩伴。</p>
            <p className="text-white font-semibold">我想做那个冬天能随时握紧你的手、<br/>那个能光明正大把你介绍给所有人的男朋友。</p>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-pink-500 mb-12 animate-pulse">
          [她的名字]，做我女朋友好吗？
        </h2>

        <div ref={containerRef} className="relative h-40 w-full flex justify-center gap-8 items-start">
            {/* Yes Button */}
            <button 
                onClick={handleSuccess}
                className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-4 px-10 rounded-full text-xl shadow-[0_0_20px_rgba(219,39,119,0.5)] transform hover:scale-110 transition-all duration-300 z-20"
            >
                我愿意
            </button>

            {/* Runaway Button */}
            <button
                style={{ 
                    position: noBtnPosition.position, 
                    top: noBtnPosition.top, 
                    left: noBtnPosition.left,
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={handleRunaway}
                onClick={handleRunaway} // For mobile touch
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 px-6 rounded-full text-sm border border-slate-600"
            >
                {noBtnText}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Confession;