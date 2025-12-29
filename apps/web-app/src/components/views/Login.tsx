import React, { useState } from 'react';
import { PageTransition } from '../layout/PageTransition';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';

interface LoginProps {
  onIntake: () => void;
}

export const Login: React.FC<LoginProps> = ({ onIntake }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ id: '', key: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    // Simulate auth check
    setTimeout(() => {
      setIsProcessing(false);
      setError("UNRECOGNIZED SIGNAL");
    }, 1500);
  };

  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#1A1A1B] text-[#F5F2ED]">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
             <div className="w-12 h-12 border border-[#B87333]/30 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#B87333]" />
             </div>
          </div>
          <h1 className="font-mono text-xs tracking-[0.3em] text-[#B87333] uppercase">
            Restricted Access
          </h1>
          <p className="font-serif text-2xl text-[#F5F2ED]">
            Member Authentication
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!error ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#F5F2ED]/40">Member ID</label>
                  <input 
                    type="text" 
                    value={formData.id}
                    onChange={e => setFormData({...formData, id: e.target.value})}
                    className="w-full bg-transparent border-b border-[#F5F2ED]/20 py-2 font-mono text-sm text-[#F5F2ED] focus:outline-none focus:border-[#B87333] transition-colors rounded-none placeholder:text-[#F5F2ED]/10"
                    placeholder="PREFIX-0000"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#F5F2ED]/40">Private Key</label>
                  <input 
                    type="password" 
                    value={formData.key}
                    onChange={e => setFormData({...formData, key: e.target.value})}
                    className="w-full bg-transparent border-b border-[#F5F2ED]/20 py-2 font-mono text-sm text-[#F5F2ED] focus:outline-none focus:border-[#B87333] transition-colors rounded-none placeholder:text-[#F5F2ED]/10"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 border border-[#F5F2ED]/20 text-[#F5F2ED]/60 font-mono text-xs uppercase tracking-[0.2em] hover:border-[#B87333] hover:text-[#B87333] transition-all duration-300 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <div className="w-3 h-3 border-t border-[#F5F2ED] rounded-full" />
                  </motion.div>
                ) : (
                  "Authenticate"
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div className="p-6 border border-[#B87333]/20 bg-[#B87333]/5 space-y-4">
                <Sparkles className="w-6 h-6 text-[#B87333] mx-auto opacity-50" />
                <p className="font-mono text-xs text-[#B87333] uppercase tracking-widest">
                  Curiosity Detected
                </p>
                <p className="font-serif text-sm text-[#F5F2ED]/70 leading-relaxed">
                  The path is closed to the uninitiated, but your attempt has been noted. We value those who seek where others do not.
                </p>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-[10px] text-[#F5F2ED]/30 uppercase tracking-widest">
                  Are you prepared to enter?
                </p>
                <button 
                  onClick={onIntake}
                  className="group relative inline-flex items-center gap-3 px-8 py-3 bg-[#B87333] text-[#1A1A1B] font-mono text-xs tracking-widest hover:bg-[#F5F2ED] transition-colors duration-500 uppercase"
                >
                  Begin Initiation
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};
