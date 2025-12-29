import React from 'react';
import { motion } from 'motion/react';

export const Portal: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen p-8">
      <header className="flex justify-between items-center py-8 border-b border-[#E5E5E5]/10">
         <h1 className="font-serif text-2xl text-[#E5E5E5]">The Eyrie</h1>
         <nav className="flex gap-8 font-mono text-xs uppercase tracking-widest text-[#E5E5E5]/50">
            <span className="text-[#9E6229]">Library</span>
            <span>Vault</span>
            <span>Signal</span>
         </nav>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
             <div className="text-6xl opacity-10">🦅</div>
             <p className="font-mono text-xs uppercase tracking-widest text-[#E5E5E5]/40">
                Protect the source. No recordings. Only outcomes.
             </p>
         </motion.div>
      </main>
    </div>
  );
};
