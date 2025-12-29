import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Entry } from './components/views/Entry';
import { Protocol } from './components/views/Protocol';
import { Contact } from './components/views/Contact';
import { Bond } from './components/views/Bond';
import { Referral } from './components/views/Referral';
import { Login } from './components/views/Login';
import { Colophon } from './components/views/Colophon';
import { AnimatePresence } from 'motion/react';

type AppState = 'ENTRY' | 'PROTOCOL' | 'CONTACT' | 'BOND' | 'REFERRAL' | 'COMPLETE' | 'LOGIN' | 'COLOPHON';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('ENTRY');
  const [userName, setUserName] = useState<string>('');
  const [isReturning, setIsReturning] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check for returning user
    const status = localStorage.getItem('sovereign_status');
    const storedName = localStorage.getItem('sovereign_user');
    
    if (status && (status === 'bond_posted' || status === 'complete')) {
      setIsReturning(true);
      if (storedName) setUserName(storedName);
    }
  }, []);

  const handleEntryNext = () => {
    // Allow proceeding to Protocol regardless of returning status
    // The "isReturning" state mainly affects the greeting on the Entry page
    setCurrentState('PROTOCOL');
  };

  const handleLoginRequest = () => {
    setCurrentState('LOGIN');
  };

  const handleProtocolComplete = () => {
    setCurrentState('CONTACT');
  };

  const handleContactComplete = () => {
    setCurrentState('BOND');
  };

  const handleBondComplete = (name: string) => {
    setUserName(name);
    localStorage.setItem('sovereign_user', name);
    localStorage.setItem('sovereign_status', 'bond_posted');
    setCurrentState('REFERRAL');
  };

  const handleReferralComplete = () => {
    localStorage.setItem('sovereign_status', 'complete');
    setIsReturning(true);
    // After completion, go back to entry to show the "Watch continues" message
    setCurrentState('ENTRY');
  };

  const handleBypass = () => {
    // Legacy bypass
    setIsDevMode(true);
  };

  const handleToggleDevMode = () => {
    setIsDevMode(prev => !prev);
  };

  const handleHome = () => {
    setCurrentState('ENTRY');
  };

  const handleReset = () => {
    localStorage.removeItem('sovereign_status');
    localStorage.removeItem('sovereign_user');
    setIsReturning(false);
    setUserName('');
    setCurrentState('ENTRY');
  };

  return (
    <MainLayout 
      onBypass={handleBypass} 
      onHome={handleHome} 
      isDevMode={isDevMode} 
      onToggleDevMode={handleToggleDevMode}
    >
      <AnimatePresence mode="wait">
        {currentState === 'ENTRY' && (
          <Entry 
            key="entry" 
            onNext={handleEntryNext} 
            onLogin={handleLoginRequest}
            onReset={handleReset}
            onColophon={() => setCurrentState('COLOPHON')}
            isReturning={isReturning}
            isDevMode={isDevMode}
            userName={userName || 'Candidate'}
          />
        )}
        
        {currentState === 'LOGIN' && (
          <Login 
            key="login"
            onIntake={() => setCurrentState('ENTRY')}
          />
        )}

        {currentState === 'COLOPHON' && (
          <Colophon 
            key="colophon"
            onBack={() => setCurrentState('ENTRY')}
          />
        )}
        
        {currentState === 'PROTOCOL' && (
          <Protocol 
            key="protocol" 
            onNext={handleProtocolComplete} 
          />
        )}

        {currentState === 'CONTACT' && (
          <Contact 
            key="contact" 
            onNext={handleContactComplete} 
            isDevMode={isDevMode}
          />
        )}
        
        {currentState === 'BOND' && (
          <Bond 
            key="bond" 
            onNext={handleBondComplete} 
            isDevMode={isDevMode}
          />
        )}
        
        {currentState === 'REFERRAL' && (
          <Referral 
            key="referral" 
            onComplete={handleReferralComplete} 
          />
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
