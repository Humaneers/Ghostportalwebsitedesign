import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export const Access: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [key, setKey] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Stub
    if (id === '881' && key === 'admin') {
         navigate('/portal');
         return;
    }
    
    // Real call
    // const res = await api.memberAuth(id, key);
    // if (res.success) navigate('/portal'); else setError('Invalid credentials.');

    setTimeout(() => {
        setError('Signal unrecognized.');
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md space-y-12">
        <h2 className="font-serif text-2xl text-[#E5E5E5]">Restricted Access</h2>
        
        <form onSubmit={handleAuth} className="space-y-8 text-left">
            <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#E5E5E5]/50">Member ID</label>
                <input 
                    required type="text" 
                    value={id}
                    onChange={e => setId(e.target.value)}
                    className="w-full bg-transparent border-b border-[#E5E5E5]/20 py-2 font-mono text-sm text-[#E5E5E5] focus:outline-none focus:border-[#9E6229] transition-colors"
                />
            </div>
            <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#E5E5E5]/50">Private Key</label>
                <input 
                    required type="password" 
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    className="w-full bg-transparent border-b border-[#E5E5E5]/20 py-2 font-mono text-sm text-[#E5E5E5] focus:outline-none focus:border-[#9E6229] transition-colors"
                />
            </div>

            {error && <p className="text-[#CF6679] font-mono text-xs uppercase tracking-widest text-center">{error}</p>}

            <div className="pt-8 text-center">
                <button 
                    disabled={loading}
                    type="submit"
                    className="font-mono text-xs uppercase tracking-widest border border-[#9E6229] text-[#9E6229] px-8 py-3 hover:bg-[#9E6229] hover:text-[#0F0F10] transition-all disabled:opacity-50"
                >
                    {loading ? 'Authenticating...' : 'Authenticate'}
                </button>
            </div>
            
            <div className="text-center">
                <button 
                   type="button"
                   onClick={() => navigate('/estate')}
                   className="font-mono text-[9px] text-[#E5E5E5]/30 uppercase tracking-widest hover:text-[#9E6229] transition-colors"
                >
                    No key? Request consideration.
                </button>
            </div>
        </form>
      </motion.div>
    </div>
  );
};
