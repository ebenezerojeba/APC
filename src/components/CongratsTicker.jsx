import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';

const CongratsTicker = ({ speed = 35 }) => {
  // CONFIGURATION
  // speed: Lower number = Faster (e.g., 20) | Higher number = Slower (e.g., 60)
  
  const segments = [
    'CONGRATULATIONS: PASTOR CORNELIUS OJELABI RE-ELECTED AS APC LAGOS CHAIRMAN',
    'THE PROGRESS CONTINUES: 2026 VICTORY SECURED',
    'A MANDATE FOR EXCELLENCE • THANK YOU LAGOSIANS',
    'LEADING THE CHARGE FOR A GREATER LAGOS 2.0',
    'UNWAVERING LEADERSHIP • RENEWED HOPE • SUSTAINED GROWTH',
  ];

  const allSegments = [...segments, ...segments, ...segments];

  return (
    <div className="relative w-full overflow-hidden bg-[#041a0b] border-y border-amber-500/30">
      {/* Background & Shimmer remains the same */}
      <div className="absolute inset-0 bg-linear-to-r from-[#064e3b] via-[#047857] to-[#064e3b]" />
      
      <div className="relative z-20 flex items-center h-10 sm:h-11">
        
        {/* RESPONSIVE BADGE */}
        <div className="shrink-0 flex items-center gap-2 px-3 sm:px-6 h-full bg-amber-500 text-black border-r border-black/10">
          {/* <Trophy size={14} fill="currentColor" className="sm:w-4 sm:h-4" /> */}
          {/* Hidden on small screens, shown on sm (640px) and up */}
          <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
            Victory
          </span>
        </div>

        {/* SCROLLING NEWS */}
        <div className="overflow-hidden flex-1 flex items-center">
          <motion.div
            // Using the speed prop here
            animate={{ x: ['0%', '-33.33%'] }}
            transition={{ 
              duration: speed, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            className="flex items-center whitespace-nowrap"
          >
            {allSegments.map((text, i) => (
              <div key={i} className="flex items-center">
                <span className="text-white text-[10px] sm:text-[11px] font-black tracking-[0.12em] uppercase px-4 sm:px-8">
                  {text}
                </span>
                <Star size={8} className="text-amber-400 fill-amber-400 opacity-60" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CongratsTicker;