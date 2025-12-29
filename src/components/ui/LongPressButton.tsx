import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';

interface LongPressButtonProps {
  onComplete: () => void;
  label: string;
}

export const LongPressButton: React.FC<LongPressButtonProps> = ({ onComplete, label }) => {
  const [isPressing, setIsPressing] = useState(false);
  const controls = useAnimation();
  const progressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const startPress = () => {
    setIsPressing(true);
  };

  const endPress = () => {
    setIsPressing(false);
    progressRef.current = 0;
    controls.start({ pathLength: 0, transition: { duration: 0.3 } });
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  useEffect(() => {
    let startTime: number;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / 2000, 1); // 2 seconds to complete
      
      controls.set({ pathLength: progress });
      
      if (progress >= 1) {
        onComplete();
      } else if (isPressing) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (isPressing) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPressing, onComplete, controls]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 select-none">
      <div 
        className="relative w-32 h-32 flex items-center justify-center cursor-pointer group"
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
      >
        {/* Outer Ring - Static */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#1A1A1B"
            strokeWidth="1"
            className="opacity-20"
          />
          {/* Progress Ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#B87333"
            strokeWidth="3"
            strokeDasharray="283"
            initial={{ pathLength: 0 }}
            animate={controls}
          />
        </svg>
        
        {/* Center Seal */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-300 ${isPressing ? 'scale-95 bg-[#B87333]/10 border-[#B87333]' : 'bg-transparent border-[#1A1A1B] group-hover:border-[#B87333]'}`}>
          <div className={`w-12 h-12 bg-[#1A1A1B] mask-center transition-all duration-500 ${isPressing ? 'opacity-100 scale-110' : 'opacity-80'}`} style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
        </div>
      </div>
      
      <p className="font-mono text-xs tracking-widest text-[#B87333] uppercase opacity-80">
        {isPressing ? "Attesting..." : label}
      </p>
    </div>
  );
};
