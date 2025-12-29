import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const intents = [
  "Intellectual sanctuary",
  "Strategic peers",
  "Restoration through craft",
  "Quiet capital alignment",
  "Observation only"
];

export const Intent: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
         className="w-full max-w-md space-y-12"
      >
        <h2 className="font-serif text-2xl text-[#1A1A1B]">What signal are you responding to?</h2>
        
        <div className="space-y-4">
            {intents.map((intent) => (
                <button
                    key={intent}
                    onClick={() => setSelected(intent)}
                    className={`w-full p-4 text-left font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                        selected === intent 
                        ? 'border-[#B87333] bg-[#B87333] text-[#F5F2ED]' 
                        : 'border-[#1A1A1B]/20 hover:border-[#B87333] text-[#1A1A1B]'
                    }`}
                >
                    {intent}
                </button>
            ))}
        </div>

        {selected && (
            <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={() => navigate('/transmission')}
                className="font-mono text-xs uppercase tracking-[0.2em] border-b border-[#B87333] text-[#B87333] pb-1 hover:text-[#1A1A1B] transition-colors"
            >
                Proceed
            </motion.button>
        )}
      </motion.div>
    </div>
  );
};
