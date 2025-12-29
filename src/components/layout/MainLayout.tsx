import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  theme?: 'hearth' | 'shadow';
}

const Ticker = () => {
  const [count, setCount] = useState(108);

  useEffect(() => {
    // Simulation Logic: 108 -> 881 (Dec 28 2025 to April 1 2026)
    const START_DATE = new Date('2025-12-28').getTime();
    const END_DATE = new Date('2026-04-01').getTime();
    const START_COUNT = 108;
    const END_COUNT = 881;
    
    const update = () => {
      const now = Date.now();
      if (now < START_DATE) { setCount(START_COUNT); return; }
      if (now >= END_DATE) { setCount(END_COUNT); return; }
      const progress = (now - START_DATE) / (END_DATE - START_DATE);
      setCount(Math.floor(START_COUNT + (END_COUNT - START_COUNT) * progress));
    };

    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="fixed top-6 right-6 font-mono text-[10px] tracking-[0.2em] z-50 select-none cursor-help" title="Saturation">
      <span className="opacity-50 mr-2">CAPACITY</span>
      {count} / 881
    </div>
  );
};

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  theme = 'hearth'
}) => {
  const navigate = useNavigate();
  const isShadow = theme === 'shadow';

  const bgColor = isShadow ? 'bg-[#0F0F10]' : 'bg-[#F5F2ED]';
  const textColor = isShadow ? 'text-[#E5E5E5]' : 'text-[#1A1A1B]';
  const accentColor = isShadow ? 'text-[#9E6229]' : 'text-[#B87333]';

  return (
    <div className={`min-h-screen w-full ${bgColor} ${textColor} overflow-hidden relative transition-colors duration-1000`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Libre Baskerville', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>
      
      {/* Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-40 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Home Icon */}
      <button 
        onClick={() => navigate('/estate')}
        className={`fixed top-6 left-6 z-50 opacity-40 hover:opacity-100 transition-opacity duration-300 ${accentColor}`}
        aria-label="Home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <circle cx="12" cy="13" r="2" />
        </svg>
      </button>

      {/* Ticker */}
      <div className={accentColor}>
        <Ticker />
      </div>

      {/* Content */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col w-full">
            {children}
        </div>
        <Footer theme={theme} />
      </main>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: isShadow ? '#0F0F10' : '#1A1A1B',
            color: isShadow ? '#E5E5E5' : '#F5F2ED',
            border: `1px solid ${isShadow ? '#9E6229' : '#B87333'}`,
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '12px',
            textTransform: 'uppercase'
          },
        }}
      />
    </div>
  );
};
