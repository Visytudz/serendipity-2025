import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Timeline from './components/Timeline';
import Confession from './components/Confession';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen font-sans text-slate-200">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <main className="animate-[fadeIn_2s_ease-in]">
           {/* Simple Background Stars/Particles can be CSS based */}
           <div className="fixed inset-0 z-[-1] opacity-50 pointer-events-none" 
                style={{backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
           </div>

           <header className="pt-20 pb-10 text-center px-4">
              <h1 className="text-3xl md:text-5xl font-serif text-slate-100 mb-4 tracking-wider">我们的故事</h1>
              <div className="w-16 h-1 bg-pink-500 mx-auto rounded-full"></div>
           </header>

           <Timeline />
           
           <Confession />

           <footer className="text-center py-8 text-slate-600 text-xs">
              <p>Designed with ❤️ for You</p>
           </footer>
        </main>
      )}
    </div>
  );
};

export default App;