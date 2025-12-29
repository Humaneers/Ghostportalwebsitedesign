import React from 'react';
import { PageTransition } from '../layout/PageTransition';
import { ArrowLeft } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export const Colophon: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden bg-[#F5F2ED]">
      <div className="max-w-2xl w-full space-y-12 text-left">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 font-mono text-xs text-[#1A1A1B]/40 uppercase tracking-widest hover:text-[#B87333] transition-colors"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Return
        </button>

        <div className="space-y-2 border-b border-[#1A1A1B]/10 pb-8">
          <h1 className="font-serif text-3xl text-[#1A1A1B]">Colophon</h1>
          <p className="font-mono text-xs text-[#B87333] uppercase tracking-widest">System Metadata & Rights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-xs text-[#1A1A1B]/60 leading-relaxed">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="uppercase tracking-widest text-[#1A1A1B]">Typography</h3>
              <p>
                Headings are set in <span className="text-[#B87333]">Libre Baskerville</span>, a traditional serif designed for digital readability.
                <br/><br/>
                Data and interface elements utilize <span className="text-[#B87333]">IBM Plex Mono</span>, reflecting the precision of early computing terminals.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="uppercase tracking-widest text-[#1A1A1B]">Stack</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>React 18.2.0</li>
                <li>Supabase (PostgreSQL)</li>
                <li>Tailwind CSS v3.4</li>
                <li>Motion (Framer)</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="uppercase tracking-widest text-[#1A1A1B]">Copyright</h3>
              <p>
                © {new Date().getFullYear()} The Sovereign Third. All rights reserved.
                <br/><br/>
                No part of this digital experience may be reproduced, stored, or transmitted in any form without prior written permission from the Council.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="uppercase tracking-widest text-[#1A1A1B]">Credits</h3>
              <p>
                Concept & Design: [REDACTED]<br/>
                Engineering: [REDACTED]<br/>
                Soundscape: Null Signal
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1A1A1B]/10 text-center md:text-left">
          <p className="font-mono text-[10px] text-[#1A1A1B]/30 uppercase tracking-[0.2em]">
            Build Version: 0.9.4-ALPHA // 1868
          </p>
        </div>
      </div>
    </PageTransition>
  );
};
