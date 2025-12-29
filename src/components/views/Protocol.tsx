import React from 'react';
import { PageTransition } from '../layout/PageTransition';
import { LongPressButton } from '../ui/LongPressButton';
import { motion } from 'motion/react';

interface ProtocolProps {
  onNext: () => void;
}

export const Protocol: React.FC<ProtocolProps> = ({ onNext }) => {
  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[#F5F2ED]">
      <div className="max-w-xl w-full space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="font-mono text-xs tracking-[0.3em] text-[#B87333] mb-6 uppercase">
            Step 1: Acknowledgment
          </h2>
          <h1 className="font-serif text-3xl md:text-5xl text-[#1A1A1B] mb-4">
            Protocol of Observation
          </h1>
          <p className="font-serif text-[#1A1A1B]/60 text-lg italic max-w-md mx-auto leading-relaxed">
            "By pressing the seal, you acknowledge that silence is not empty, but full of answers."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center"
        >
          <LongPressButton 
            label="Long Press to Attest" 
            onComplete={onNext}
          />
        </motion.div>

        <div className="h-px w-32 bg-[#1A1A1B]/10 mx-auto" />
      </div>
    </PageTransition>
  );
};
