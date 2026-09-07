import React, { createContext, useContext, useState, useEffect } from 'react';
import { FLOW_STEPS } from '../data/modulesData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Dual mode: 'FIGMA_CANVAS' | 'REAL_APP'
  const [currentMode, setCurrentMode] = useState('FIGMA_CANVAS');
  
  // Active step ID in learning flow: 'onboarding' | 'module-1' | 'module-2' | 'module-3' | 'module-4' | 'assessment'
  const [activeStepId, setActiveStepId] = useState('onboarding');
  
  // Active bottom nav tab in Real App mode: 'dashboard' | 'modules' | 'quiz' | 'evaluation' | 'profile'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Zoom scale in Figma Canvas mode
  const [zoomScale, setZoomScale] = useState(1);

  // Canvas Layout Mode: '1_ROW' (6 cols x 1 row) | '2_COLS' (2 cols x 3 rows) | '3_COLS' (3 cols x 2 rows)
  const [canvasLayout, setCanvasLayout] = useState('1_ROW');

  // User & Progress State
  const [teacherName, setTeacherName] = useState('ครูสมศรี ปัญญาดี');
  const [schoolName, setSchoolName] = useState('โรงเรียนสาธิตดิจิทัลวิทยานุสรณ์');
  const [completedModules, setCompletedModules] = useState(['module-1']);
  const [quizScores, setQuizScores] = useState({ 'module-1': 100 });
  const [postTestScore, setPostTestScore] = useState(null);
  const [isCertificateIssued, setIsCertificateIssued] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Toast Notification state for "Copy Direct Link"
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync active step with bottom nav tab when switching steps
  const selectStep = (stepId, modeOverride = null) => {
    setActiveStepId(stepId);
    if (modeOverride) {
      setCurrentMode(modeOverride);
    }
    
    // Map step to appropriate tab in real app
    if (stepId === 'onboarding') setActiveTab('dashboard');
    else if (stepId.startsWith('module-')) setActiveTab('modules');
    else if (stepId === 'assessment') setActiveTab('evaluation');
  };

  const markModuleCompleted = (moduleId, score = 100) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
    setQuizScores(prev => ({ ...prev, [moduleId]: score }));
  };

  const copyDirectLink = (stepId) => {
    const stepObj = FLOW_STEPS.find(s => s.id === stepId);
    const url = `${window.location.origin}${window.location.pathname}#frame=${stepId}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    showToast(`คัดลอก Direct Link ของ "${stepObj ? stepObj.shortTitle : stepId}" เรียบร้อยแล้ว!`);
  };

  const switchMode = (newMode) => {
    setCurrentMode(newMode);
    showToast(`สลับไปยังโหมด: ${newMode === 'FIGMA_CANVAS' ? 'Figma Canvas Prototype' : 'Real Production App'}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentMode,
        setCurrentMode,
        switchMode,
        activeStepId,
        setActiveStepId,
        selectStep,
        activeTab,
        setActiveTab,
        zoomScale,
        setZoomScale,
        canvasLayout,
        setCanvasLayout,
        teacherName,
        setTeacherName,
        schoolName,
        setSchoolName,
        completedModules,
        markModuleCompleted,
        quizScores,
        postTestScore,
        setPostTestScore,
        isCertificateIssued,
        setIsCertificateIssued,
        showCertificateModal,
        setShowCertificateModal,
        toastMessage,
        showToast,
        copyDirectLink
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
