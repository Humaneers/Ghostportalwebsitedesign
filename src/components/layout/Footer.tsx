import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  theme: 'hearth' | 'shadow';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isShadow = theme === 'shadow';
  const textColor = isShadow ? 'text-[#E5E5E5]' : 'text-[#1A1A1B]';
  const mutedColor = isShadow ? 'text-[#E5E5E5]/40' : 'text-[#1A1A1B]/40';
  const hoverColor = isShadow ? 'hover:text-[#9E6229]' : 'hover:text-[#B87333]';

  return (
    <footer className={`w-full py-12 text-center z-50 relative ${textColor} transition-colors duration-1000 mt-auto`}>
      <nav className="flex flex-wrap justify-center gap-6 md:gap-12 mb-6 px-4">
        <Link to="/estate" className={`font-mono text-[10px] uppercase tracking-widest ${mutedColor} ${hoverColor} transition-colors`}>Estate</Link>
        <Link to="/protocol" className={`font-mono text-[10px] uppercase tracking-widest ${mutedColor} ${hoverColor} transition-colors`}>Protocol</Link>
        <Link to="/intent" className={`font-mono text-[10px] uppercase tracking-widest ${mutedColor} ${hoverColor} transition-colors`}>Intent</Link>
        <Link to="/transmission" className={`font-mono text-[10px] uppercase tracking-widest ${mutedColor} ${hoverColor} transition-colors`}>Transmission</Link>
        <Link to="/access" className={`font-mono text-[10px] uppercase tracking-widest ${mutedColor} ${hoverColor} transition-colors`}>Access</Link>
      </nav>
      <div className={`font-mono text-[10px] uppercase tracking-[0.2em] ${mutedColor}`}>
        <Link to="/colophon" className={`${hoverColor} transition-colors`}>Colophon</Link>
        <span className="mx-3 opacity-30">/</span>
        <span className="opacity-50">© 2025 The Sovereign Third</span>
      </div>
    </footer>
  );
};
