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
  const [amenityForm, setAmenityForm] = useState({
    name: '',
    email: '',
    request: '',
    audience: 'External',
  });
  
  const labels = ["CAPACITY", "VELOCITY", "ARCHITECTS", "COMMANDERS", "WORLD MAKERS"];
  
  // Scramble Effects
  const title1 = useScramble("Silence is the ultimate luxury.", introStage === 'TEXT');
  const title2 = useScramble("The Third Sovereign awaits.", introStage === 'TEXT');

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

  const handleAmenitySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!amenityForm.name.trim() || !amenityForm.request.trim()) {
      toast("Name and request are required.");
      return;
    }
    toast("Amenity request logged. The Archivist will review.");
    setAmenityForm({ name: '', email: '', request: '', audience: 'External' });
  };

  const OWL_ASCII = `
   ,_,
  (O,O)
  (   )
  -"-"-
  `;

  return (
    <PageTransition className="flex flex-col items-center min-h-screen p-8 relative overflow-x-hidden">
      
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

      <div className="w-full max-w-6xl space-y-16 relative z-10">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center">
          <div className="space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-[#B87333]">
              <span>The Third Sovereign</span>
              <span className="text-[#1A1A1B]/40">•</span>
              <span>The Centurions Society</span>
            </div>
            {isReturning ? (
              <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
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
              <>
                {introStage === 'OWL' ? (
                  <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                      transition={{ duration: 1 }}
                      className="flex flex-col items-start justify-center"
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
                )}
                <p className="text-base md:text-lg text-[#1A1A1B]/80 leading-relaxed max-w-2xl">
                  Between the demands of Command and the intimacy of Domestic, a vacuum exists. The Third Sovereign
                  is the sanctuary for the unburdened mind — an analog estate where attention is protected and
                  quiet power can recover.
                </p>
              </>
            )}
          </div>

          <div className="border border-[#1A1A1B]/10 bg-white/70 p-6 md:p-8 space-y-6 text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">Credibility Signals</p>
            <div className="space-y-4">
              <div>
                <p className="font-serif text-2xl text-[#1A1A1B]">881 Membership Cap</p>
                <p className="text-sm text-[#1A1A1B]/70">440 Local, 440 Global, and one ceremonial seat for the 1881 Spirit.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="border border-[#1A1A1B]/10 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">Analog Standard</p>
                  <p className="text-sm text-[#1A1A1B]/70">Faraday Protocol zones eliminate digital noise.</p>
                </div>
                <div className="border border-[#1A1A1B]/10 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">Re-Chartered 2025</p>
                  <p className="text-sm text-[#1A1A1B]/70">Founded 1881. Re-activated for the next century of builders.</p>
                </div>
              </div>
            </div>
            {!isReturning && (
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={onNext}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#B87333] text-[#B87333] font-mono text-sm tracking-widest hover:bg-[#B87333] hover:text-[#F5F2ED] transition-all duration-500 uppercase overflow-hidden"
                >
                  <span className="relative z-10">Request Consideration</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                  <div className="absolute inset-0 bg-[#B87333] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
                <a 
                  href="#amenity-request"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-[#1A1A1B] font-mono text-[10px] tracking-[0.3em] uppercase hover:text-[#B87333] transition-colors"
                >
                  Request an Amenity
                  <Eye className="w-3 h-3" />
                </a>
              </div>
            )}
            <p className="font-mono text-[10px] text-[#1A1A1B]/30 uppercase tracking-[0.2em]">
              The Third Sovereign is The Centurions Society.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'The Analog Standard',
              detail: 'The only estate in the Southwest with Faraday Protocol zones for total cognitive quiet.',
            },
            {
              title: 'The 1881 Cap',
              detail: 'Membership secured by alignment, not volume. We curate clarity over crowd.',
            },
            {
              title: 'The Craft',
              detail: 'Zen of labor: vineyards and restoration workshops to reset the modern mind.',
            },
          ].map((signal) => (
            <div key={signal.title} className="border border-[#1A1A1B]/10 p-6 space-y-3 bg-[#F5F2ED]/70">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">Signal</p>
              <h3 className="font-serif text-2xl text-[#1A1A1B]">{signal.title}</h3>
              <p className="text-sm text-[#1A1A1B]/80 leading-relaxed">{signal.detail}</p>
            </div>
          ))}
        </section>
      </div>

      <div className="w-full max-w-5xl mt-16 mb-24 px-4 sm:px-8 text-left space-y-16">
        <section className="space-y-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">Anticipation Architecture</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1B]">The Third Sovereign is the public name of The Centurions Society.</h2>
          <div className="space-y-4 text-sm md:text-base text-[#1A1A1B]/80 leading-relaxed">
            <p>
              Between the demands of the Command and the intimacy of the Domestic, a vacuum exists. For the
              architect of industry, the burden of decision-making is constant, and the spaces to truly disconnect are few.
            </p>
            <p>
              The Third Sovereign is not a social club. It is a sanctuary for the unburdened mind — the intellectual rigor
              of a university library fused with the friction-less hospitality of a private estate. We are strictly capped at
              <span className="text-[#B87333] font-semibold"> 881 memberships</span> worldwide.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="border border-[#1A1A1B]/10 bg-[#F5F2ED]/70 p-6 space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">The Estate • Day</p>
            <h3 className="font-serif text-2xl text-[#1A1A1B]">The Hearth</h3>
            <p className="text-sm text-[#1A1A1B]/80 leading-relaxed">
              A sun-drenched sanctuary centered around the Strategos Library. No screens. No pings. Only vellum, espresso,
              and peers who value silence as the ultimate luxury.
            </p>
          </div>
          <div className="border border-[#1A1A1B]/10 bg-[#1A1A1B]/95 p-6 space-y-4 text-[#F5F2ED]">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">The Estate • Night</p>
            <h3 className="font-serif text-2xl">The Shadow</h3>
            <p className="text-sm text-[#F5F2ED]/80 leading-relaxed">
              Behind unmarked doors lies The Vault — obsidian stone and leather built for quiet celebration and off-record
              conversations that shape the future.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="border border-[#1A1A1B]/10 p-6 space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">Analog Standard</p>
            <p className="text-sm text-[#1A1A1B]/80 leading-relaxed">
              Faraday Protocol zones protect your attention span as fiercely as your privacy.
            </p>
          </div>
          <div className="border border-[#1A1A1B]/10 p-6 space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">The 1881 Cap</p>
            <p className="text-sm text-[#1A1A1B]/80 leading-relaxed">
              440 Local, 440 Global, and one ceremonial seat reserved for the 1881 Spirit.
            </p>
          </div>
          <div className="border border-[#1A1A1B]/10 p-6 space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">The Craft</p>
            <p className="text-sm text-[#1A1A1B]/80 leading-relaxed">
              Restore the hands: vineyards, workshops, and analog rituals that reset the modern mind.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">Coming Soon</p>
            <h3 className="font-serif text-2xl text-[#1A1A1B]">Amenities in Anticipation</h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1A1A1B]/50">Public Teaser</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: 'Astral Observatory', detail: 'Rooftop horizon chamber for meteor cycles and silent watch.' },
              { title: 'Copper Bath Atelier', detail: 'Private thermal immersion suites with desert botanicals.' },
              { title: 'The Archive Concierge', detail: 'On-call researcher to surface primary sources on demand.' },
              { title: 'Vineyard Restoration Lab', detail: 'Analog craft studio for wine, wood, and ceremonial tools.' },
            ].map((amenity) => (
              <div key={amenity.title} className="border border-[#1A1A1B]/10 p-5 space-y-2 bg-[#F5F2ED]/70">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B87333]">Coming Soon</p>
                <h4 className="font-serif text-xl text-[#1A1A1B]">{amenity.title}</h4>
                <p className="text-sm text-[#1A1A1B]/75">{amenity.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="amenity-request" className="border border-[#1A1A1B]/10 p-6 md:p-10 bg-white/70 space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B87333]">Request an Amenity</p>
            <h3 className="font-serif text-2xl text-[#1A1A1B]">Shape what arrives next.</h3>
            <p className="text-sm text-[#1A1A1B]/70">
              External audiences may submit desired experiences. The Archivist consolidates requests for the Council.
            </p>
          </div>
          <form onSubmit={handleAmenitySubmit} className="grid gap-4 md:grid-cols-2">
            <label className="sr-only" htmlFor="amenity-name">Name</label>
            <input
              id="amenity-name"
              type="text"
              placeholder="Name"
              value={amenityForm.name}
              onChange={(event) => setAmenityForm({ ...amenityForm, name: event.target.value })}
              className="border border-[#1A1A1B]/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#1A1A1B] focus:outline-none focus:border-[#B87333]"
            />
            <label className="sr-only" htmlFor="amenity-email">Email (optional)</label>
            <input
              id="amenity-email"
              type="email"
              placeholder="Email (optional)"
              value={amenityForm.email}
              onChange={(event) => setAmenityForm({ ...amenityForm, email: event.target.value })}
              className="border border-[#1A1A1B]/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#1A1A1B] focus:outline-none focus:border-[#B87333]"
            />
            <label className="sr-only" htmlFor="amenity-audience">Audience</label>
            <select
              id="amenity-audience"
              value={amenityForm.audience}
              onChange={(event) => setAmenityForm({ ...amenityForm, audience: event.target.value })}
              className="border border-[#1A1A1B]/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#1A1A1B] focus:outline-none focus:border-[#B87333]"
            >
              <option>External</option>
              <option>Prospect</option>
              <option>Partner</option>
            </select>
            <div className="md:col-span-2">
              <label className="sr-only" htmlFor="amenity-request">Amenity request</label>
              <textarea
                id="amenity-request"
                placeholder="Describe the amenity you want to see."
                value={amenityForm.request}
                onChange={(event) => setAmenityForm({ ...amenityForm, request: event.target.value })}
                rows={4}
                className="w-full border border-[#1A1A1B]/20 bg-transparent px-4 py-3 font-sans text-sm text-[#1A1A1B] focus:outline-none focus:border-[#B87333]"
              />
            </div>
            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1A1A1B]/50">
                The Estate opens to aligned frequencies only.
              </p>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-[#B87333] text-[#B87333] font-mono text-xs uppercase tracking-[0.3em] hover:bg-[#B87333] hover:text-[#F5F2ED] transition-colors"
              >
                Submit Request
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </section>
      </div>

      <div className="mt-16 w-full text-center space-y-4 pb-8">
        <div 
            onClick={handleKnock}
            className="flex items-center justify-center gap-6 font-mono text-[10px] text-[#1A1A1B]/40 uppercase tracking-[0.2em] cursor-pointer select-none hover:text-[#B87333] transition-colors duration-300"
        >
           <span>Est. 1881</span>
           <span>•</span>
           <span>The Third Sovereign</span>
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
