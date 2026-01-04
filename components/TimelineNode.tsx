import React from 'react';
import { motion } from 'framer-motion';
import { TimelineNodeData, InteractionType } from '../types';
import Polaroid from './interactions/Polaroid';
import VinylPlayer from './interactions/VinylPlayer';
import FogReveal from './interactions/FogReveal';
import ScrollExpand from './interactions/ScrollExpand';
import GiftBox from './interactions/GiftBox';
import FireworkNode from './interactions/FireworkNode';

interface Props {
  data: TimelineNodeData;
  index: number;
  isActive: boolean;
}

const TimelineNode: React.FC<Props> = ({ data, index, isActive }) => {
  const renderContent = () => {
    switch (data.type) {
      case InteractionType.POLAROID:
        return <Polaroid data={data} />;
      case InteractionType.VINYL:
        return <VinylPlayer data={data} />;
      case InteractionType.FOG:
        return <FogReveal data={data} />;
      case InteractionType.SCROLL:
        return <ScrollExpand data={data} />;
      case InteractionType.GIFT:
        return <GiftBox data={data} />;
      case InteractionType.FIREWORKS:
        return <FireworkNode data={data} />;
      default:
        return <div>Unknown Type</div>;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-6 relative overflow-hidden">
       {/* Background Decoration (Subtle) */}
       <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-love-900/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl"></div>
       </div>

       <motion.div
         className="relative z-10 w-full max-w-lg flex flex-col items-center"
         initial="hidden"
         animate={isActive ? "visible" : "hidden"}
         variants={{
           hidden: { opacity: 0, y: 50, scale: 0.95 },
           visible: { 
             opacity: 1, 
             y: 0, 
             scale: 1,
             transition: { 
               duration: 0.8, 
               delay: 0.2, // Wait for slide transition to settle slightly
               staggerChildren: 0.2 
             } 
           }
         }}
       >
          {/* Header Section */}
          <motion.div 
            className="mb-8 text-center"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
          >
             <div className="inline-block px-4 py-1.5 border border-love-500/30 rounded-full bg-black/20 backdrop-blur-sm mb-4">
                 <span className="text-love-300 font-serif tracking-widest text-sm">{data.date}</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-serif text-white font-light tracking-wide">{data.title}</h2>
          </motion.div>

          {/* Interaction Area */}
          <motion.div 
            className="w-full"
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
            }}
          >
              {renderContent()}
          </motion.div>
       </motion.div>
    </div>
  );
};

export default TimelineNode;