import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const Estate: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'hearth' | 'shadow'>('hearth');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative transition-colors duration-1000">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="max-w-2xl space-y-12"
      >
        <h1 className="font-serif text-4xl md:text-6xl text-[#1A1A1B]">
          {mode === 'hearth' ? 'Sanctuary.' : 'Silence.'}
        </h1>
        
        <p className="font-mono text-sm md:text-base text-[#1A1A1B]/60 max-w-md mx-auto leading-relaxed">
          {mode === 'hearth' 
            ? "A gathering of 881. The hearth is warm for those who build." 
            : "The shadow protects the source. Observation is active."}
        </p>

        <div className="flex gap-8 justify-center items-center">
            <button 
                onClick={() => setMode(m => m === 'hearth' ? 'shadow' : 'hearth')}
                className="font-mono text-xs uppercase tracking-widest text-[#B87333] hover:text-[#1A1A1B] transition-colors"
            >
                {mode === 'hearth' ? 'Enter Shadow' : 'Return to Hearth'}
            </button>
            
            <button 
                onClick={() => navigate('/protocol')}
                className="font-mono text-xs uppercase tracking-widest border border-[#B87333] text-[#B87333] px-6 py-3 hover:bg-[#B87333] hover:text-[#F5F2ED] transition-all"
            >
                Proceed
            </button>
        </div>
      </motion.div>
    </div>
  );
};
