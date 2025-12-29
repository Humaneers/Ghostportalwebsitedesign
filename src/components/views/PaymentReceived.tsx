import React from 'react';
import { motion } from 'motion/react';

export const PaymentReceived: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-lg">
        <h2 className="font-serif text-3xl text-[#E5E5E5]">Received</h2>
        
        <div className="space-y-4 font-mono text-xs uppercase tracking-widest text-[#E5E5E5]/60 leading-relaxed border-t border-b border-[#E5E5E5]/10 py-8">
            <p>Your signal has been received.</p>
            <p>Observation is underway.</p>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5E5E5]/30">
            Silence is normal.
        </p>
      </motion.div>
    </div>
  );
};
