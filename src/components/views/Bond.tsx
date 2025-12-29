import React, { useState } from 'react';
import { PageTransition } from '../layout/PageTransition';
import { motion } from 'motion/react';
import { Lock, CreditCard, ShieldCheck } from 'lucide-react';

import { api } from '../../utils/api';

interface BondProps {
  onNext: (name: string) => void;
  isDevMode?: boolean;
}

export const Bond: React.FC<BondProps> = ({ onNext, isDevMode }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  React.useEffect(() => {
    if (isDevMode) {
      setName('Test Subject Alpha');
      setCardNumber('4242 4242 4242 4242');
      setExpiry('12/29');
      setCvc('123');
    }
  }, [isDevMode]);

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCvc(val);
    
    // Bypass code
    if (val === '1868') {
      setIsProcessing(true);
      // Immediate success for the initiated
      setTimeout(() => {
        onNext(name || 'Initiate');
      }, 800);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Fire and forget increment
    api.incrementCount();

    setTimeout(() => {
      onNext(name);
    }, 2000);
  };

  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-screen p-6 md:p-8 bg-[#F5F2ED]">
      <div className="w-full max-w-2xl bg-[#F5F2ED] relative">
        {/* Decorative borders for dossier look */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#1A1A1B]/20" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#1A1A1B]/20" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#1A1A1B]/20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#1A1A1B]/20" />

        <div className="p-8 md:p-12 space-y-10">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-xs tracking-[0.3em] text-[#B87333] uppercase">
              Step 3: Commitment
            </h2>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1B]">
              The Shield Collateral
            </h1>
            <p className="font-mono text-xs text-[#1A1A1B]/50 uppercase tracking-widest mt-2">
              Bond Amount: $1,500.00 USD
            </p>
          </div>

          <div className="prose prose-sm mx-auto text-[#1A1A1B]/70 font-serif leading-relaxed text-justify max-w-md">
            <p>
              The Bond is a tether. It ensures the integrity of the Sovereign Third. 
              Should the Shield be broken through indiscretion, the Bond is forfeited to the Goodwill Trust. 
              It is the price of silence and the proof of intent.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div className="space-y-4">
              <div className="w-full">
                <div className="flex justify-between items-baseline mb-1">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">Cardholder Name</label>
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-[#1A1A1B]/30 py-2 font-mono text-sm focus:outline-none focus:border-[#B87333] transition-colors rounded-none placeholder:text-[#1A1A1B]/20"
                  placeholder="FULL NAME"
                />
              </div>
              
              <div className="w-full">
                <div className="flex justify-between items-baseline mb-1">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">Card Number</label>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    pattern="[0-9\s]*"
                    className="w-full bg-transparent border-b border-[#1A1A1B]/30 py-2 font-mono text-sm focus:outline-none focus:border-[#B87333] transition-colors rounded-none placeholder:text-[#1A1A1B]/20 pl-8"
                    placeholder="0000 0000 0000 0000"
                  />
                  <CreditCard className="absolute left-0 top-2 w-4 h-4 text-[#1A1A1B]/40" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="w-full">
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">Expiry</label>
                  </div>
                  <input 
                    type="text" 
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-transparent border-b border-[#1A1A1B]/30 py-2 font-mono text-sm focus:outline-none focus:border-[#B87333] transition-colors rounded-none placeholder:text-[#1A1A1B]/20"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/60">CVC</label>
                  </div>
                  <input 
                    type="text" 
                    required
                    value={cvc}
                    onChange={handleCvcChange}
                    className="w-full bg-transparent border-b border-[#1A1A1B]/30 py-2 font-mono text-sm focus:outline-none focus:border-[#B87333] transition-colors rounded-none placeholder:text-[#1A1A1B]/20"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#1A1A1B] text-[#F5F2ED] font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#B87333] transition-colors duration-500 flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <ShieldCheck className="w-4 h-4" />
                </motion.div>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  Initiate Transfer
                </>
              )}
            </button>
            
            <p className="text-center font-mono text-[9px] text-[#1A1A1B]/40 uppercase">
              Secure transmission via Sovereign Protocol
            </p>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};
