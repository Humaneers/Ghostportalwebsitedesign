import React from 'react';
import { Toaster } from 'sonner@2.0.3';

interface MainLayoutProps {
  children: React.ReactNode;
  onBypass?: () => void;
  onHome?: () => void;
  isDevMode?: boolean;
  onToggleDevMode?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  onBypass, 
  onHome, 
  isDevMode = false, 
  onToggleDevMode 
}) => {
  const [memberId, setMemberId] = React.useState('');

  React.useEffect(() => {
    // Easter egg for console explorers
    console.log(
      "%c THE THIRD SOVEREIGN \n %c You have looked behind the veil. \n We are looking for those with your curiosity. \n Begin intake: %c /?origin=console_protocol ",
      "background: #1A1A1B; color: #B87333; font-size: 24px; padding: 10px; font-family: monospace;",
      "background: #1A1A1B; color: #F5F2ED; font-size: 14px; padding: 5px; font-family: monospace;",
      "background: #B87333; color: #1A1A1B; font-size: 14px; padding: 5px; font-weight: bold; font-family: monospace;"
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      // Just listen for the space + 1868 pattern globally
      // Since keeping track of 'Space' hold is tricky with other inputs,
      // we will use a rolling buffer of keys and look for the sequence " 1868"
      // or "Space" followed by "1868".
      // But since "Space" is " " in e.key...
      
      // Store in window or local static var to avoid closure staleness if dependencies change
      // But here we use functional update so it's fine.
      
      // Wait, we need to handle this carefully.
    };
    
    // We'll use a ref for the keys to avoid re-binding listener on every key press
  }, []);

  // Use a ref to track keys to avoid dependency loop issues
  const keysRef = React.useRef<string[]>([]);
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentKeys = keysRef.current;
      const newKeys = [...currentKeys, e.key];
      if (newKeys.length > 10) newKeys.shift(); // Keep buffer small but large enough
      keysRef.current = newKeys;
      
      const sequence = newKeys.join('');
      // Check for " 1868" (Space, 1, 8, 6, 8)
      if (sequence.includes(' 1868')) {
         onToggleDevMode?.();
         keysRef.current = []; // Reset keys
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleDevMode]);

  const handleMemberIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMemberId(value);
    // Keep legacy input working just in case, but map it to same action?
    // User said "enter a developer mode with space+1868". 
    // The legacy input was for "Bypass". 
    // If user types 1868 in the input, we should probably trigger the same Dev Mode if onBypass was doing that.
    // In App.tsx, onBypass does setIsDevMode(true). So yes.
    if (value === '1868' && onBypass) {
      onBypass();
    }
  };

  return (
    <div className={`min-h-screen w-full bg-[#F5F2ED] text-[#1A1A1B] overflow-hidden relative selection:bg-[#B87333] selection:text-[#F5F2ED] ${isDevMode ? 'border-4 border-dashed border-[#B87333]' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        
        .font-serif {
          font-family: 'Libre Baskerville', serif;
        }
        
        .font-mono {
          font-family: 'IBM Plex Mono', monospace;
        }

        body {
          /* cursor: none; removed */
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #F5F2ED;
        }
        ::-webkit-scrollbar-thumb {
          background: #B87333;
          border-radius: 4px;
        }
      `}</style>
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-40" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Hidden Source Code Message for Inspectors */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {`
          <!-- 
          ============================================================
           THE THIRD SOVEREIGN GATEWAY
          ============================================================
          
           Subject: UNKNOWN
           Origin:  DOM_INSPECTOR
           Status:  CURIOSITY DETECTED
          
           You are the exact type of person we are looking for.
           Most people only see the surface. You chose to look deeper.
          
           If you wish to proceed with your findings:
           Start the intake process here: /?origin=dom_inspector_protocol
          
           God Mode: SPACE + 1868
          ============================================================
          -->
        `}
      </div>

      {/* Home / Reset Button */}
      <button 
        onClick={onHome}
        className="fixed top-6 left-6 z-50 opacity-40 hover:opacity-100 transition-opacity duration-300 text-[#B87333]"
        aria-label="Reset Process"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Owl Home Symbol */}
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <circle cx="9" cy="13" r="2" />
          <circle cx="15" cy="13" r="2" />
          <path d="M12 16l-1 2h2l-1-2" />
        </svg>
      </button>

      {/* Dev Mode Exit Button */}
      {isDevMode && (
        <div className="fixed top-6 right-6 z-50">
          <button 
            onClick={onToggleDevMode}
            className="bg-[#B87333] text-[#F5F2ED] px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-[#1A1A1B] transition-colors shadow-lg"
          >
            Exit Dev Mode
          </button>
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </main>

      {/* Member ID Bypass - Kept as fallback/legacy but hidden */}
      <div className="fixed bottom-4 right-4 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <input 
          type="text" 
          value={memberId}
          onChange={handleMemberIdChange}
          placeholder="ID"
          className="bg-transparent border-b border-[#1A1A1B] w-12 text-xs font-mono text-center focus:outline-none focus:border-[#B87333] placeholder:text-[#1A1A1B]/50"
        />
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1A1A1B',
            color: '#F5F2ED',
            border: '1px solid #B87333',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          },
        }}
      />
    </div>
  );
};
