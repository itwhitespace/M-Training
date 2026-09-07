import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { FigmaTopBar } from './components/figma/FigmaTopBar';
import { FigmaSidebar } from './components/figma/FigmaSidebar';
import { FigmaCanvas } from './components/figma/FigmaCanvas';
import { MobileLayout } from './components/app/MobileLayout';
import { CertificateModal } from './components/common/CertificateModal';
import { CheckCircle2 } from 'lucide-react';

const MainContainer = () => {
  const { currentMode, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-400/40 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Certificate Modal */}
      <CertificateModal />

      {/* Dual Mode View Switcher */}
      {currentMode === 'FIGMA_CANVAS' ? (
        <div className="flex flex-col h-screen overflow-hidden">
          <FigmaTopBar />
          <div className="flex flex-1 overflow-hidden relative">
            <FigmaSidebar />
            <FigmaCanvas />
          </div>
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
