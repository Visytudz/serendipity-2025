import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TimelineNodeData } from '../../types';

interface Props {
  data: TimelineNodeData;
}

const Polaroid: React.FC<Props> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Split content by <br/> to create separate paragraphs for better spacing/typography
  const contentSegments = data.content.split('<br/>').filter(s => s.trim().length > 0);

  return (
    <div className="w-full max-w-sm mx-auto h-[480px] cursor-pointer perspective-1000 group" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side (Photo) */}
        <div 
          className="absolute inset-0 backface-hidden flex flex-col items-center p-5 bg-white shadow-2xl rounded-sm border-[1px] border-gray-200"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Photo Frame */}
          <div className="w-full h-[340px] overflow-hidden bg-gray-100 mb-6 shadow-inner relative">
            {/* Film Grain Overlay */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none z-10 mix-blend-overlay"></div>
            <img 
              src={data.image || `https://placehold.co/600x400/png?text=${data.imageAlt}`} 
              alt={data.imageAlt}
              className="w-full h-full object-cover filter contrast-[1.1] sepia-[0.2]"
            />
          </div>
          
          <div className="font-serif text-3xl text-gray-800 tracking-widest mt-1 font-medium transform -rotate-1">
            {data.frontText || data.date}
          </div>
          
          <div className="absolute bottom-3 right-4">
             <i className="fas fa-undo text-gray-300 text-sm opacity-50 group-hover:opacity-100 transition-opacity"></i>
          </div>
        </div>

        {/* Back Side (Note/Letter) */}
        <div 
          className="absolute inset-0 backface-hidden shadow-xl p-6 md:p-8 flex flex-col items-center justify-center text-center rounded-sm overflow-hidden"
          style={{ 
              backfaceVisibility: 'hidden', 
              transform: "rotateY(180deg)",
              backgroundColor: '#fffbf0', // Warmer paper color
              backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', // Subtle dot pattern
              backgroundSize: '20px 20px'
          }}
        >
           {/* Decorative Tape at Top */}
           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-love-200/40 rotate-1 backdrop-blur-sm shadow-sm border-l border-r border-white/50 z-10"></div>

           {/* Content Container */}
           <div className="relative z-0 h-full flex flex-col justify-center w-full">
               <div className="text-love-300/30 mb-4 flex justify-center">
                  <i className="fas fa-quote-left text-2xl"></i>
               </div>

               <div className="font-serif text-gray-700 text-lg flex flex-col gap-3 md:gap-4">
                 {contentSegments.map((segment, index) => (
                   <p 
                     key={index}
                     className="leading-relaxed [&>strong]:text-love-600 [&>strong]:font-medium [&>strong]:border-b-2 [&>strong]:border-love-200/50"
                     dangerouslySetInnerHTML={{ __html: segment }}
                   />
                 ))}
               </div>

               {/* Decorative Stamp/Signature at Bottom Right */}
               <div className="absolute bottom-4 right-2 transform -rotate-12 opacity-80">
                   <div className="border-2 border-love-400/30 rounded-full w-16 h-16 flex items-center justify-center p-1">
                       <div className="border border-love-400/30 rounded-full w-full h-full flex items-center justify-center text-[10px] text-love-400/50 font-serif uppercase tracking-widest text-center">
                           Memory<br/>Kept
                       </div>
                   </div>
               </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Polaroid;