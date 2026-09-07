import React from 'react';
import { Home, BookOpen, HelpCircle, Award, User, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNavBar = () => {
  const { activeTab, setActiveTab, selectStep } = useApp();

  const tabs = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: Home, stepId: 'onboarding' },
    { id: 'modules', label: 'โมดูล 1-4', icon: BookOpen, stepId: 'module-1' },
    { id: 'quiz', label: 'แบบฝึกหัด', icon: HelpCircle, stepId: 'module-1' },
    { id: 'evaluation', label: 'แบบประเมิน', icon: Award, stepId: 'assessment' },
    { id: 'profile', label: 'โปรไฟล์ครู', icon: User, stepId: 'onboarding' }
  ];

  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center z-40 px-4 pointer-events-none">
      <nav className="bg-white/70 backdrop-blur-2xl border border-white/90 rounded-full px-3.5 py-2.5 flex items-center gap-1 shadow-2xl shadow-indigo-500/20 pointer-events-auto max-w-sm w-full justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'dashboard') selectStep('onboarding');
                else if (tab.id === 'evaluation') selectStep('assessment');
              }}
              className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/40 scale-105 px-4 py-2 rounded-full' : 'p-2.5 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/60'}`}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <span className="text-[10px] font-extrabold tracking-tight mt-0.5 animate-in fade-in duration-200">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
