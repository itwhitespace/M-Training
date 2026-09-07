import React from 'react';
import { useApp } from '../../context/AppContext';
import { BottomNavBar } from './BottomNavBar';
import { OnboardingView } from '../../views/OnboardingView';
import { Module1View } from '../../views/Module1View';
import { Module2View } from '../../views/Module2View';
import { Module3View } from '../../views/Module3View';
import { Module4View } from '../../views/Module4View';
import { AssessmentView } from '../../views/AssessmentView';
import { ProfileView } from '../../views/ProfileView';
import { Layout, Bell, Sparkles, Heart, Clock, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';

export const MobileLayout = () => {
  const { switchMode, activeStepId, activeTab, completedModules, selectStep, teacherName } = useApp();

  const progressPct = Math.round((completedModules.length / 4) * 100);

  const renderActiveView = () => {
    if (activeTab === 'profile') return <ProfileView />;

    switch (activeStepId) {
      case 'onboarding':
        return <OnboardingView />;
      case 'module-1':
        return <Module1View />;
      case 'module-2':
        return <Module2View />;
      case 'module-3':
        return <Module3View />;
      case 'module-4':
        return <Module4View />;
      case 'assessment':
        return <AssessmentView />;
      default:
        return <OnboardingView />;
    }
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col items-center justify-start text-slate-900 select-none">
      {/* Centered Phone Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col mesh-gradient-bg border-x border-white/60 shadow-2xl relative">
        {/* iOS Header (Matching specification layout 1) */}
        <header className="bg-white/60 backdrop-blur-2xl border-b border-white/80 px-5 py-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* User Profile Avatar + Date Greeting */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 p-0.5 shadow-md shadow-indigo-500/20">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-extrabold text-indigo-700 text-sm">
                  {teacherName ? teacherName.charAt(0) : 'T'}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {todayStr}
                </span>
                <h1 className="text-sm font-extrabold text-slate-900 leading-tight flex items-center gap-1">
                  Hello, <span className="text-indigo-600">{teacherName.split(' ')[0]}</span> 👋
                </h1>
              </div>
            </div>

            {/* Circular Glass Notification Badge & Figma Mode Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchMode('FIGMA_CANVAS')}
                className="px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
                title="Switch to Figma Canvas Prototype"
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Figma</span>
              </button>

              <div className="w-9 h-9 rounded-full glass-circle-btn flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform">
                <Bell className="w-4 h-4 text-slate-700" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-white animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* 2-Column Summary Cards Grid (Matching specification layout 2) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Left Summary Card: Progress Score */}
            <div className="glass-card-ios p-3 rounded-[24px] flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Competency Score</span>
                <div className="w-6 h-6 rounded-full bg-indigo-100/80 text-indigo-600 flex items-center justify-center">
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="my-1">
                <span className="text-lg font-extrabold text-slate-900 font-mono">
                  {progressPct}<span className="text-xs text-slate-400 font-normal">/100</span>
                </span>
                <span className="text-[10px] text-indigo-600 font-semibold block">You're on the right Track!</span>
              </div>

              {/* Progress Pill Bar */}
              <div className="w-full h-2 bg-indigo-100/80 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
            </div>

            {/* Right Summary Card: Next Session */}
            <div className="glass-card-ios p-3 rounded-[24px] flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Next Session</span>
                <div className="w-6 h-6 rounded-full bg-purple-100/80 text-purple-600 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block truncate">
                  {activeStepId.startsWith('module-') ? `Module ${activeStepId.split('-')[1]}` : 'Onboarding & Guide'}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">UNESCO Framework</span>
              </div>
              <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">
                  3 สัปดาห์
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </div>
            </div>
          </div>

          {/* Module Selector Chips if in 'modules' tab */}
          {activeTab === 'modules' && (
            <div className="flex gap-1.5 overflow-x-auto pt-3 pb-0.5 no-scrollbar">
              {['module-1', 'module-2', 'module-3', 'module-4'].map((mId, idx) => (
                <button
                  key={mId}
                  onClick={() => selectStep(mId)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${activeStepId === mId ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20' : 'bg-white/80 text-slate-600 border-white/90 hover:text-indigo-600'}`}
                >
                  Module {idx + 1}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Main View Content */}
        <main className="flex-1 pb-28 overflow-y-auto">
          {renderActiveView()}
        </main>

        {/* Floating Bottom App Navigation */}
        <BottomNavBar />
      </div>
    </div>
  );
};
