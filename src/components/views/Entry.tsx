import React, { useEffect, useState, useRef } from 'react';
import { PageTransition } from '../layout/PageTransition';
import { LegalModal } from '../modals/LegalModal';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Eye, Triangle } from 'lucide-react';
import { api } from '../../utils/api';
import { toast } from 'sonner@2.0.3';

interface EntryProps {
  onNext: () => void;
  onLogin: () => void;
  onReset: () => void;
  onColophon: () => void;
  isReturning?: boolean;
  userName?: string;
  isDevMode?: boolean;
}

// Scrambler Logic
const useScramble = (text: string, active: boolean) => {
  const [display, setDisplay] = useState(text);
  // Reduced to alphanumeric for a cleaner "digital scoreboard" feel
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  useEffect(() => {
    if (!active) {
        setDisplay(text);
        return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(prev => 
        text.split('').map((letter, index) => {
          if (letter === ' ' || letter === '.') return letter; // Preserve spaces and punctuation
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );

      if (iterations >= text.length) clearInterval(interval);
      // Slower, more mechanical reveal
      iterations += 1 / 4; 
    }, 40);

    return () => clearInterval(interval);
  }, [text, active]);

  return display;
};

export const Entry: React.FC<EntryProps> = ({ onNext, onLogin, onReset, onColophon, isReturning, userName, isDevMode }) => {
  const [count, setCount] = useState(108);
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalView, setLegalView] = useState<'TERMS' | 'PRIVACY'>('TERMS');
  const [labelIndex, setLabelIndex] = useState(0);
  const [knockCount, setKnockCount] = useState(0);
  const [showGhost, setShowGhost] = useState(false);
  const [glitchTitle, setGlitchTitle] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [introStage, setIntroStage] = useState<'OWL' | 'TEXT'>(isReturning ? 'TEXT' : 'OWL');
  
  const labels = ["CAPACITY", "VELOCITY", "ARTISTS", "LEADERS", "WORLD CHANGERS"];
  
  // Scramble Effects
  const title1 = useScramble("The signal is faint.", introStage === 'TEXT');
  const title2 = useScramble("The response is absolute.", introStage === 'TEXT');

  // Counter Simulation Logic
  useEffect(() => {
    const updateCount = () => {
        const START_DATE = new Date('2025-12-28').getTime();
        const END_DATE = new Date('2026-04-01').getTime();
        const START_COUNT = 108;
        const END_COUNT = 881;
        
        const now = Date.now();
        if (now < START_DATE) {
            setCount(START_COUNT);
            return;
        }
        if (now >= END_DATE) {
            setCount(END_COUNT);
            return;
        }

        const totalDuration = END_DATE - START_DATE;
        const elapsed = now - START_DATE;
        const progress = elapsed / totalDuration;
        
        setCount(Math.floor(START_COUNT + (END_COUNT - START_COUNT) * progress));
    };

    updateCount();
    const interval = setInterval(updateCount, 1000 * 60 * 60); // Update hourly
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (introStage === 'OWL' && !isReturning) {
      const timer = setTimeout(() => {
        setIntroStage('TEXT');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [introStage, isReturning]);

  useEffect(() => {
    // Check for origin query param
    const params = new URLSearchParams(window.location.search);
    const origin = params.get('origin');
    if (origin) {
      localStorage.setItem('sovereign_origin', origin);
      console.log(`%c Origin traced: ${origin}`, "color: #B87333; font-family: monospace;");
    } else {
        console.log("%c The watcher is watching.", "color: #1A1A1B; font-family: monospace; font-style: italic;");
    }
    
    // Rotate Labels
    const labelInterval = setInterval(() => {
        setLabelIndex(prev => (prev + 1) % labels.length);
    }, 4000);

    // Occasional Glitch
    const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            setGlitchTitle(true);
            setTimeout(() => setGlitchTitle(false), 200);
        }
    }, 8000);

    return () => {
        clearInterval(labelInterval);
        clearInterval(glitchInterval);
    };
  }, []);

  const handleKnock = () => {
    const newCount = knockCount + 1;
    setKnockCount(newCount);
    
    if (newCount === 3) {
        toast("The door is already open.");
    } else if (newCount === 7) {
        toast("Sovereignty is not given. It is taken.");
        setShowGhost(true);
        setTimeout(() => setShowGhost(false), 3000);
    }
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.toLowerCase().replace(/\s/g, '') === 'iknowleo') {
      window.open('https://docs.google.com/document/d/1YuP1CzbulVa-uNRFW_MxBbcqhRwSlOenoKM7EWv-1Fc/edit?usp=sharing', '_blank');
      return;
    }
    onNext();
  };

  const OWL_ASCII = `
   ,_,
  (O,O)
  (   )
  -"-"-
  `;

  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden">
      
      {/* Ghost Overlay */}
      <AnimatePresence>
        {showGhost && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
            >
                <div className="font-mono text-[20vw] font-bold text-[#1A1A1B] opacity-10 rotate-12">
                    OBSERVE
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-8 right-8 font-mono text-xs text-[#B87333] cursor-help" title="Current Saturation">
        <span className="opacity-50 mr-2 transition-all duration-500">
            {labels[labelIndex]}
        </span>
        {count.toLocaleString()} / 881
      </div>

      <div className="max-w-4xl space-y-12 relative z-10">
        <div className="h-[240px] flex flex-col items-center justify-center">
        {isReturning ? (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
             >
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-[#1A1A1B]">
                  The Council is reviewing your frequency, {userName}.<br/>
                  <span className="italic text-[#B87333] text-3xl md:text-5xl block mt-4">The watch continues.</span>
                </h1>
                
                {isDevMode && (
                  <button 
                    onClick={onReset}
                    className="text-[10px] font-mono text-[#1A1A1B]/30 uppercase tracking-widest hover:text-[#B87333] transition-colors"
                  >
                    [ RESET SIGNAL ]
                  </button>
                )}
            </motion.div>
          ) : (
            introStage === 'OWL' ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center justify-center"
                >
                    <pre className="font-mono text-[#B87333] text-sm md:text-base leading-none whitespace-pre animate-pulse">
                        {OWL_ASCII}
                    </pre>
                </motion.div>
            ) : (
                <h1 className={`font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-[#1A1A1B] transition-all duration-100 ${glitchTitle ? 'opacity-50 blur-[2px] translate-x-1' : ''}`}>
                    <span className="block mb-2">{title1}</span>
                    <span className="italic text-[#B87333]">{title2}</span>
                </h1>
            )
          )}
        </div>

        {!isReturning && (
          <div className="h-24 w-full flex justify-center items-center">
            {introStage === 'TEXT' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <button 
                  onClick={onNext}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#B87333] text-[#B87333] font-mono text-sm tracking-widest hover:bg-[#B87333] hover:text-[#F5F2ED] transition-all duration-500 uppercase overflow-hidden"
                >
                  <span className="relative z-10">Answer the Call</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                  <div className="absolute inset-0 bg-[#B87333] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
                
                <p className="font-mono text-[10px] text-[#1A1A1B]/30 uppercase tracking-[0.2em] opacity-0 animate-[fadeIn_3s_ease-in_2s_forwards]">
                    Silence is the first test
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-0 w-full text-center space-y-4 z-20">
        <div 
            onClick={handleKnock}
            className="flex items-center justify-center gap-6 font-mono text-[10px] text-[#1A1A1B]/40 uppercase tracking-[0.2em] cursor-pointer select-none hover:text-[#B87333] transition-colors duration-300"
        >
           <span>Est. 1881</span>
           <span>•</span>
           <span>The Sovereign Third</span>
        </div>
        
        <div className="flex items-center justify-center gap-6">
           <button 
             onClick={onColophon}
             className="font-mono text-[9px] text-[#1A1A1B]/50 uppercase tracking-[0.1em] hover:text-[#B87333] transition-colors"
           >
             Colophon
           </button>
           <button 
             onClick={() => { setLegalView('TERMS'); setLegalOpen(true); }}
             className="font-mono text-[9px] text-[#1A1A1B]/50 uppercase tracking-[0.1em] hover:text-[#B87333] transition-colors"
           >
             Protocol
           </button>
           <button 
             onClick={() => { setLegalView('PRIVACY'); setLegalOpen(true); }}
             className="font-mono text-[9px] text-[#1A1A1B]/50 uppercase tracking-[0.1em] hover:text-[#B87333] transition-colors"
           >
             Privacy
           </button>
           
           {showInvite ? (
             <form onSubmit={handleInviteSubmit} className="flex items-center gap-2 border-b border-[#B87333]">
                <input 
                  autoFocus
                  type="text"
                  placeholder="KEY"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-16 bg-transparent border-none outline-none font-mono text-[9px] text-[#B87333] placeholder:text-[#B87333]/30 uppercase tracking-[0.1em] pb-0.5"
                />
                <button type="submit" className="text-[#B87333] hover:text-[#1A1A1B] transition-colors pb-0.5">
                    <ArrowRight className="w-2.5 h-2.5" />
                </button>
             </form>
           ) : (
             <button 
               onClick={() => setShowInvite(true)}
               className="font-mono text-[9px] text-[#1A1A1B]/50 uppercase tracking-[0.1em] hover:text-[#B87333] transition-colors"
             >
               Invitation
             </button>
           )}

           <button 
             onClick={onLogin}
             className="font-mono text-[9px] text-[#B87333]/50 uppercase tracking-[0.1em] hover:text-[#B87333] transition-colors flex items-center gap-2"
           >
             <Triangle className="w-2 h-2 rotate-180" />
             Member Access
           </button>
        </div>
      </div>
      
      <LegalModal 
        isOpen={legalOpen}
        onClose={() => setLegalOpen(false)}
        view={legalView}
      />
    </PageTransition>
  );
};
