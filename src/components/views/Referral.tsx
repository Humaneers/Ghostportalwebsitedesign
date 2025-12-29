import React, { useState } from 'react';
import { PageTransition } from '../layout/PageTransition';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, UserPlus } from 'lucide-react';

interface ReferralProps {
  onComplete: () => void;
}

export const Referral: React.FC<ReferralProps> = ({ onComplete }) => {
  const [peers, setPeers] = useState<{name: string, email: string}[]>([
    { name: '', email: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addPeer = () => {
    if (peers.length < 3) {
      setPeers([...peers, { name: '', email: '' }]);
    }
  };

  const updatePeer = (index: number, field: 'name' | 'email', value: string) => {
    const newPeers = [...peers];
    newPeers[index][field] = value;
    setPeers(newPeers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(onComplete, 2500);
    }, 1500);
  };

  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-screen p-6 md:p-8 bg-[#F5F2ED]">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="font-mono text-xs tracking-[0.3em] text-[#B87333] uppercase">
                Step 3: Curation
              </h2>
              <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1B]">
                Identify the Frequency
              </h1>
              <p className="font-serif text-[#1A1A1B]/60 text-base italic max-w-lg mx-auto">
                "Identify like-minded individuals who carry the weight of worlds. Curation is the highest form of service."
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {peers.map((peer, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative p-6 border border-[#1A1A1B]/10 hover:border-[#B87333]/50 transition-colors bg-[#F5F2ED]"
                  >
                    <div className="absolute top-0 left-0 bg-[#1A1A1B] text-[#F5F2ED] font-mono text-[10px] px-2 py-1">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="grid gap-2">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/40">Name</label>
                        <input 
                          type="text" 
                          required
                          value={peer.name}
                          onChange={(e) => updatePeer(index, 'name', e.target.value)}
                          className="w-full bg-transparent border-b border-[#1A1A1B]/20 py-1 font-serif text-lg focus:outline-none focus:border-[#B87333] transition-colors placeholder:text-[#1A1A1B]/10"
                          placeholder="e.g. A. V. TURING"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/40">Contact</label>
                        <input 
                          type="email" 
                          required
                          value={peer.email}
                          onChange={(e) => updatePeer(index, 'email', e.target.value)}
                          className="w-full bg-transparent border-b border-[#1A1A1B]/20 py-1 font-mono text-sm focus:outline-none focus:border-[#B87333] transition-colors placeholder:text-[#1A1A1B]/10"
                          placeholder="secure@channel.com"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {peers.length < 3 && (
                <button
                  type="button"
                  onClick={addPeer}
                  className="w-full py-3 border border-dashed border-[#1A1A1B]/30 text-[#1A1A1B]/60 font-mono text-xs uppercase tracking-widest hover:border-[#B87333] hover:text-[#B87333] transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-3 h-3" />
                  Add Another Peer
                </button>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#B87333] text-[#F5F2ED] font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#1A1A1B] transition-colors duration-500 mt-8"
              >
                {isSubmitting ? "Transmitting..." : "Submit Candidates"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#B87333] flex items-center justify-center text-[#B87333]">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#1A1A1B] mb-2">Protocol Complete</h2>
              <p className="font-mono text-xs text-[#1A1A1B]/60 leading-relaxed">
                Confirmation sequence initiated.<br/>
                Expect secure transmission at 01:18 or 08:18 local time.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
