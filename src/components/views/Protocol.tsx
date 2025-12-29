import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const Protocol: React.FC = () => {
  const navigate = useNavigate();
  const [holding, setHolding] = useState(false);
  const [complete, setComplete] = useState(false);
  const [message, setMessage] = useState("Press and hold the seal to attest.");
  const timerRef = useRef<any>(null);

  const DURATION = 1800;

  const startHold = () => {
    if (complete) return;
    setHolding(true);
    setMessage("Attesting...");
    timerRef.current = setTimeout(() => {
        setComplete(true);
        setMessage("Recognized.");
        setTimeout(() => navigate('/intent'), 1000);
    }, DURATION);
  };

  const endHold = () => {
    if (complete) return;
    setHolding(false);
    clearTimeout(timerRef.current);
    setMessage("Not yet.");
    setTimeout(() => setMessage("Press and hold the seal to attest."), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <motion.div 
         initial={{ opacity: 0 }} 
         animate={{ opacity: 1 }} 
         className="space-y-16 max-w-xl"
      >
        <div className="space-y-4">
            <h2 className="font-serif text-2xl text-[#1A1A1B]">Protocol I — Recognition</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-[#1A1A1B]/50">
                Those who arrive here do not stumble. They respond.
            </p>
        </div>

        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle cx="64" cy="64" r="60" stroke="#1A1A1B" strokeWidth="1" fill="none" opacity="0.1" />
                <motion.circle 
                    cx="64" cy="64" r="60" 
                    stroke="#B87333" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: holding ? 1 : 0 }}
                    transition={{ duration: holding ? DURATION / 1000 : 0.2, ease: "linear" }}
                />
            </svg>
            
            {/* Seal Button */}
            <button
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className="w-24 h-24 rounded-full bg-[#1A1A1B] text-[#F5F2ED] flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                aria-label="Seal"
            >
                <div className="w-16 h-16 border border-[#B87333] rounded-full opacity-50" />
            </button>
        </div>

        <div className="h-8 font-mono text-xs uppercase tracking-[0.2em] text-[#B87333]">
            {message}
        </div>
        
        <p className="font-mono text-[10px] text-[#1A1A1B]/30 uppercase tracking-widest">
            Silence is not empty. It is full of answers.
        </p>
      </motion.div>
    </div>
  );
};
