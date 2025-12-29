import React from 'react';
import { motion } from 'motion/react';

export const TransmissionReceived: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-lg">
        <div className="w-2 h-2 bg-[#B87333] rounded-full mx-auto animate-pulse" />
        
        <h2 className="font-serif text-2xl text-[#1A1A1B]">The signal has been logged.</h2>
        
        <div className="space-y-4 font-mono text-xs uppercase tracking-widest text-[#1A1A1B]/60 leading-relaxed">
            <p>Evaluation occurs in cycles, not queues.</p>
            <p>Silence is also a response.</p>
        </div>

        <div className="pt-12">
            <label className="flex items-center justify-center gap-4 cursor-pointer group">
                <div className="relative w-10 h-5 bg-[#1A1A1B]/10 rounded-full transition-colors group-hover:bg-[#B87333]/20">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-[#1A1A1B] rounded-full transition-transform group-hover:translate-x-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/40 group-hover:text-[#B87333] transition-colors">
                    Receive Disclosures & Estate Updates
                </span>
            </label>
        </div>
      </motion.div>
    </div>
  );
};
