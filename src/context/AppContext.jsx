import React, { createContext, useContext, useState } from 'react';
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

  // Canvas Layout Mode: '1_ROW' | '2_COLS' | '3_COLS' | 'FREE_DRAG'
  const [canvasLayout, setCanvasLayout] = useState('1_ROW');

  // Dynamic Draggable Positions for 6 Frames on Figma Canvas
  const [framePositions, setFramePositions] = useState({
    'onboarding': { x: 60, y: 80 },
    'module-1': { x: 520, y: 80 },
    'module-2': { x: 980, y: 80 },
    'module-3': { x: 1440, y: 80 },
    'module-4': { x: 1900, y: 80 },
    'assessment': { x: 2360, y: 80 }
  });

  // Live Editable Text Content (Syncs live between Canvas and Real App)
  const [editableContent, setEditableContent] = useState({
    'onboarding': {
      title: 'การออกแบบการอบรมครูเรื่อง Digital Citizenship',
      subtitle: 'โครงการ M-Training พัฒนาสมรรถนะดิจิทัลสำหรับครู รองรับ Mosher & Gottfredson Level 2 & 3',
      ctaText: 'Chat & Learn Module 1'
    },
    'module-1': {
      title: 'Digital Safety & Legal Risk',
      subtitle: 'ความปลอดภัย สิทธิความเป็นส่วนตัว และกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA)'
    },
    'module-2': {
      title: 'Emotional Intelligence & Well-being',
      subtitle: 'การสร้างสมดุลชีวิตและสุขภาวะดิจิทัลสำหรับครูยุคใหม่'
    },
    'module-3': {
      title: 'Digital Creativity & Innovation',
      subtitle: 'การสร้างสรรค์สื่อนวัตกรรมการสอนดิจิทัล และการใช้ AI อย่างมีจริยธรรม'
    },
    'module-4': {
      title: 'Digital Participation & Agency',
      subtitle: 'อัตลักษณ์วิชาชีพครู การเป็นพลเมืองดิจิทัลต้นแบบ และการสร้างพลังขับเคลื่อนสังคม'
    },
    'assessment': {
      title: 'แบบประเมินสมรรถนะครูดิจิทัลหลังเรียน',
      subtitle: 'ประเมินความรู้ 4 โมดูลตามกรอบสมรรถนะ UNESCO'
    }
  });

  // Function to update inline text live across all previews
  const updateEditableText = (stepId, key, newText) => {
    setEditableContent(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [key]: newText
      }
    }));
  };

  // Function to update individual frame position on drag
  const updateFramePosition = (stepId, newX, newY) => {
    setFramePositions(prev => ({
      ...prev,
      [stepId]: { x: Math.max(0, newX), y: Math.max(0, newY) }
    }));
  };

  // Reset all frame positions to default row layout
  const resetFramePositions = () => {
    setFramePositions({
      'onboarding': { x: 60, y: 80 },
      'module-1': { x: 520, y: 80 },
      'module-2': { x: 980, y: 80 },
      'module-3': { x: 1440, y: 80 },
      'module-4': { x: 1900, y: 80 },
      'assessment': { x: 2360, y: 80 }
    });
  };

  // User & Progress State
  const [teacherName, setTeacherName] = useState('ครูสมศรี ปัญญาดี');
  const [schoolName, setSchoolName] = useState('โรงเรียนสาธิตดิจิทัลวิทยานุสรณ์');
  const [completedModules, setCompletedModules] = useState(['module-1']);
  const [quizScores, setQuizScores] = useState({ 'module-1': 100 });
  const [postTestScore, setPostTestScore] = useState(null);
  const [isCertificateIssued, setIsCertificateIssued] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectStep = (stepId, modeOverride = null) => {
    setActiveStepId(stepId);
    if (modeOverride) {
      setCurrentMode(modeOverride);
    }
    
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
        framePositions,
        updateFramePosition,
        resetFramePositions,
        editableContent,
        updateEditableText,
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
