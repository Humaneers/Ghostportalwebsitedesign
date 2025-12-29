import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';

export const Bond: React.FC = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [appId, setAppId] = useState('');

  useEffect(() => {
    if (!token) {
        setChecking(false);
        setAllowed(false);
        return;
    }

    api.bondEligibility(token).then(res => {
        setAllowed(res.allowed);
        if (res.allowed) setAppId(res.applicationId);
        setChecking(false);
    });
  }, [token]);

  const handlePay = async () => {
      const res = await api.stripeCheckout(appId);
      if (res?.url) window.location.href = res.url;
  };

  if (checking) {
      return (
          <div className="flex items-center justify-center min-h-screen">
              <div className="w-2 h-2 bg-[#9E6229] animate-ping" />
          </div>
      );
  }

  if (!allowed) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center text-[#E5E5E5]">
             <h2 className="font-serif text-xl opacity-50">Signal Unverified.</h2>
             <p className="font-mono text-xs uppercase tracking-widest mt-4 opacity-30">Access Denied.</p>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl space-y-12 border border-[#9E6229]/20 p-12 rounded-sm relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0F0F10] px-4 font-mono text-xs uppercase tracking-[0.2em] text-[#9E6229]">
            Application Bond
        </div>

        <div className="space-y-2">
            <h2 className="font-serif text-5xl text-[#E5E5E5]">$1,500.00</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#E5E5E5]/40">USD / One-time</p>
        </div>

        <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-[#E5E5E5]/60 text-left mx-auto max-w-xs list-disc pl-4">
            <li>This bond preserves signal integrity.</li>
            <li>Payment does not guarantee acceptance.</li>
            <li>Non-refundable.</li>
        </ul>

        <button 
            onClick={handlePay}
            className="w-full bg-[#9E6229] text-[#0F0F10] font-mono text-sm uppercase tracking-widest py-4 hover:bg-[#E5E5E5] transition-colors"
        >
            Submit the Bond →
        </button>
      </motion.div>
    </div>
  );
};
