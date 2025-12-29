import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export const Transmission: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', location: '', invitedBy: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.transmissionSubmit(form);
    setLoading(false);
    navigate('/transmission-received');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md space-y-12">
        <h2 className="font-serif text-2xl text-[#1A1A1B]">Identify.</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
            <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/50">Email Frequency</label>
                <input 
                    required type="email" 
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-transparent border-b border-[#1A1A1B]/20 py-2 font-mono text-sm focus:outline-none focus:border-[#B87333] transition-colors"
                />
            </div>
            <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/50">City / Region</label>
                <input 
                    required type="text" 
                    value={form.location}
                    onChange={e => setForm({...form, location: e.target.value})}
                    className="w-full bg-transparent border-b border-[#1A1A1B]/20 py-2 font-mono text-sm focus:outline-none focus:border-[#B87333] transition-colors"
                />
            </div>
            <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1B]/50">Invited By (Optional)</label>
                <input 
                    type="text" 
                    value={form.invitedBy}
                    onChange={e => setForm({...form, invitedBy: e.target.value})}
                    className="w-full bg-transparent border-b border-[#1A1A1B]/20 py-2 font-mono text-sm focus:outline-none focus:border-[#B87333] transition-colors"
                />
            </div>

            <div className="pt-8 text-center">
                <button 
                    disabled={loading}
                    type="submit"
                    className="font-mono text-xs uppercase tracking-widest border border-[#B87333] text-[#B87333] px-8 py-3 hover:bg-[#B87333] hover:text-[#F5F2ED] transition-all disabled:opacity-50"
                >
                    {loading ? 'Transmitting...' : 'Transmit Signal'}
                </button>
            </div>
            
            <p className="text-center font-mono text-[9px] text-[#1A1A1B]/30 uppercase tracking-widest">
                Your transmission is encrypted. We do not sell data.
            </p>
        </form>
      </motion.div>
    </div>
  );
};
