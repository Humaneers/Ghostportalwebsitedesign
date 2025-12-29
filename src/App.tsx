import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { AnimatePresence } from 'motion/react';

// Views
import { Estate } from './components/views/Estate';
import { Protocol } from './components/views/Protocol';
import { Intent } from './components/views/Intent';
import { Transmission } from './components/views/Transmission';
import { TransmissionReceived } from './components/views/TransmissionReceived';
import { Access } from './components/views/Access';
import { Bond } from './components/views/Bond';
import { PaymentReceived } from './components/views/PaymentReceived';
import { Portal } from './components/views/Portal';

// Legacy views (mapped or unused, kept for safety)
import { Login } from './components/views/Login'; 
import { Colophon } from './components/views/Colophon';

// Safe Env Access
const getEnv = (key: string, defaultValue: string) => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    return import.meta.env[key] || defaultValue;
  }
  return defaultValue;
};

const AppContent = () => {
  const location = useLocation();
  const [theme, setTheme] = useState<'hearth' | 'shadow'>('hearth');

  // Theme Switching Logic based on route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/access') || path.includes('/portal') || path.includes('/bond')) {
      setTheme('shadow');
    } else {
      setTheme('hearth'); // Default to hearth for estate, protocol, intent, transmission
    }
  }, [location]);

  return (
    <MainLayout theme={theme}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Redirect root of SPA to Estate or appropriate start */}
          <Route path="/" element={<Navigate to="/estate" replace />} />
          
          {/* Funnel */}
          <Route path="/estate" element={<Estate />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/intent" element={<Intent />} />
          <Route path="/transmission" element={<Transmission />} />
          <Route path="/transmission-received" element={<TransmissionReceived />} />
          
          {/* Member / Shadow Paths */}
          <Route path="/access" element={<Access />} />
          <Route path="/bond" element={<Bond />} />
          <Route path="/payment-received" element={<PaymentReceived />} />
          <Route path="/portal/*" element={<Portal />} />
          
          {/* Legacy / Utilities */}
          <Route path="/login" element={<Navigate to="/access" replace />} />
          <Route path="/colophon" element={<Colophon />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/estate" replace />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
};

export default function App() {
  const envBasePath = getEnv('BASE_URL', '/app/');
  
  // Determine if the current location actually matches the configured base path.
  // This prevents crashing in dev/preview environments where the app might be served from root '/'
  // even though production expects '/app/'.
  const effectiveBasename = 
    typeof window !== 'undefined' && window.location.pathname.startsWith(envBasePath)
      ? envBasePath
      : '/';

  return (
    <BrowserRouter basename={effectiveBasename}>
      <AppContent />
    </BrowserRouter>
  );
}
