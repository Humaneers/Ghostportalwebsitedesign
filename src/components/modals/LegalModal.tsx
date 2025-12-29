import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  view: 'PRIVACY' | 'TERMS';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, view }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A1B]/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-[#F5F2ED] z-50 border border-[#1A1A1B]/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#1A1A1B]/10 flex items-center justify-between bg-[#F5F2ED]">
              <div className="flex items-center gap-3">
                {view === 'TERMS' ? (
                  <FileText className="w-4 h-4 text-[#B87333]" />
                ) : (
                  <Shield className="w-4 h-4 text-[#B87333]" />
                )}
                <h2 className="font-mono text-xs tracking-[0.2em] text-[#B87333] uppercase">
                  {view === 'TERMS' ? 'Vigilance Clause 18.81' : 'Privacy Protocol'}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="text-[#1A1A1B]/40 hover:text-[#B87333] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8">
              {view === 'TERMS' ? (
                <div className="space-y-8 font-serif text-sm text-[#1A1A1B]/80 leading-relaxed">
                  <div className="text-center space-y-2 mb-8">
                    <h3 className="font-serif text-xl text-[#1A1A1B]">The Protocol of Observation</h3>
                    <p className="font-mono text-[10px] text-[#1A1A1B]/40 uppercase tracking-widest">
                      Internal Reference: Vigilance Clause 18.81
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#1A1A1B] uppercase tracking-widest">I. The Nature of Inquiry</h4>
                    <p>
                      Entry into the Society is not bought; it is recognized. By initiating this inquiry and submitting your operational intelligence, you grant the Innate Council permission to verify your alignment with the Vanguard’s Code. This is the Due Diligence of Character.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#1A1A1B] uppercase tracking-widest">II. The Theater of the Everyday</h4>
                    <p>
                      Our stewards do not merely review resumes; we observe the frequency. Be advised: following your submission, you may notice subtle echoes of the Society within your immediate environment. This may manifest as a quiet nod from a stranger in the Arizona desert, an unexpected invitation to a private library, or a brief, unexplained alignment in your digital periphery.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#1A1A1B] uppercase tracking-widest">III. The Shield of Discretion</h4>
                    <p>
                      While we observe, we also protect. Your identity remains shielded within the archive. However, our presence in your world serves as a "First Ounce"—a gesture of our awareness. If you find this level of attention disconcerting, we suggest you withdraw your inquiry now. The weight of the world requires those who are comfortable being seen, even when the observer is invisible.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#1A1A1B] uppercase tracking-widest">IV. Acknowledgment of the Vanguard</h4>
                    <p>
                      By clicking "Post the Bond," you acknowledge that the Society is no longer a concept, but an active participant in your reality. You agree to the Vigilance Protocol and accept that the forge is now open.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 font-serif text-sm text-[#1A1A1B]/80 leading-relaxed">
                  <div className="text-center space-y-2 mb-8">
                    <h3 className="font-serif text-xl text-[#1A1A1B]">Privacy Protocol</h3>
                    <p className="font-mono text-[10px] text-[#1A1A1B]/40 uppercase tracking-widest">
                      Data Integrity & Archival Standards
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#1A1A1B] uppercase tracking-widest">1. Data Collection</h4>
                    <p>
                      We collect only what is voluntarily offered: your frequency, your intent, and the artifacts of your digital presence. All transmission is encrypted.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#1A1A1B] uppercase tracking-widest">2. Usage of Intelligence</h4>
                    <p>
                      Information provided is used solely for the purpose of assessing alignment with the Sovereign Third. We do not trade, sell, or broadcast your identity to external entities. Your data is a frequency we monitor, not a commodity we exchange.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#1A1A1B] uppercase tracking-widest">3. The Right to Vanish</h4>
                    <p>
                      Should you wish to withdraw your frequency from our archives, you may submit a formal request for expungement.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#1A1A1B] uppercase tracking-widest">4. Contact</h4>
                    <p>
                      For inquiries regarding your data dossier:<br/>
                      <a href="mailto:third@invitationorgs.dev" className="text-[#B87333] hover:underline">third@invitationorgs.dev</a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#1A1A1B]/10 bg-[#F5F2ED] flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-[#1A1A1B] text-[#F5F2ED] font-mono text-xs uppercase tracking-widest hover:bg-[#B87333] transition-colors"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
