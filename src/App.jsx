import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { FigmaSidebar } from './components/figma/FigmaSidebar';
import { FigmaCanvas } from './components/figma/FigmaCanvas';
import { MobileLayout } from './components/app/MobileLayout';
import { CertificateModal } from './components/common/CertificateModal';
import { AiMentorChat } from './components/common/AiMentorChat';
import { CheckCircle2 } from 'lucide-react';

const MainContainer = () => {
  const { currentMode, toastMessage } = useApp();

  // Register PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-indigo-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-indigo-400/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Certificate Modal */}
      <CertificateModal />

      {/* Floating AI Mentor Chat Widget */}
      <AiMentorChat />

      {/* Dual Mode View Switcher */}
      {currentMode === 'FIGMA_CANVAS' ? (
        <div className="flex flex-1 h-screen overflow-hidden relative">
          <FigmaSidebar />
          <FigmaCanvas />
        </div>
      ) : (
        <MobileLayout />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContainer />
    </AppProvider>
  );
}
