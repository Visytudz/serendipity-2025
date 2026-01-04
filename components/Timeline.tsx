import React from 'react';
import { TIMELINE_NODES } from '../constants';
import { NodeType } from '../types';
import Polaroid from './interactions/Polaroid';
import Vinyl from './interactions/Vinyl';
import FogScratch from './interactions/FogScratch';
import ScrollMap from './interactions/ScrollMap';
import GiftBox from './interactions/GiftBox';
import Fireworks from './interactions/Fireworks';

const Timeline: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 space-y-24">
      {TIMELINE_NODES.map((node, index) => {
        const isLeft = index % 2 === 0;
        return (
          <div key={node.id} className="relative fade-in-section opacity-100 transition-opacity duration-1000">
            
            {/* Date Connector Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-700 -z-10 transform md:-translate-x-1/2"></div>
            
            {/* Date Badge */}
            <div className="flex justify-start md:justify-center mb-6">
                <span className="bg-slate-800 border border-slate-600 px-4 py-1 rounded-full text-xs font-mono text-pink-300 shadow-lg z-10">
                    {node.date}
                </span>
            </div>

            {/* Content Component */}
            <div className={`transition-all duration-700`}>
              {node.type === NodeType.POLAROID && <Polaroid data={node} />}
              {node.type === NodeType.VINYL && <Vinyl data={node} />}
              {node.type === NodeType.FOG && <FogScratch data={node} />}
              {node.type === NodeType.SCROLL && <ScrollMap data={node} />}
              {node.type === NodeType.GIFT && <GiftBox data={node} />}
              {node.type === NodeType.FIREWORKS && <Fireworks data={node} />}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default Timeline;