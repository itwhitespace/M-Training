import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, Maximize2, Move, Wifi, Battery, Signal } from 'lucide-react';
import { OnboardingView } from '../../views/OnboardingView';
import { Module1View } from '../../views/Module1View';
import { Module2View } from '../../views/Module2View';
import { Module3View } from '../../views/Module3View';
import { Module4View } from '../../views/Module4View';
import { AssessmentView } from '../../views/AssessmentView';

export const FigmaFrame = ({ step, isFocused, onFocus, position, style }) => {
  const { copyDirectLink, selectStep, updateFramePosition } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialFrameX: 0, initialFrameY: 0 });

  const handleMouseDown = (e) => {
    // Only trigger drag if clicking the header bar or drag handle
    if (e.target.closest('.no-drag')) return;

    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialFrameX: position?.x || 0,
      initialFrameY: position?.y || 0
    };

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.startX;
      const deltaY = moveEvent.clientY - dragStartRef.current.startY;

      const newX = dragStartRef.current.initialFrameX + deltaX;
      const newY = dragStartRef.current.initialFrameY + deltaY;

      updateFramePosition(step.id, newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const renderViewContent = () => {
    switch (step.id) {
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

  return (
    <div
      onClick={onFocus}
      onMouseDown={handleMouseDown}
      style={{
        width: '380px',
        ...style
      }}
      className={`transition-shadow duration-200 select-none group flex flex-col items-center cursor-grab ${isDragging ? 'cursor-grabbing z-50 scale-[1.01]' : 'z-10'}`}
    >
      {/* Figma Frame Header Bar & Drag Handle */}
      <div
        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-bold mb-2 transition-all ${isFocused ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400' : 'bg-white/90 text-slate-700 hover:bg-white border border-indigo-100 shadow-sm'}`}
      >
        <div className="flex items-center gap-2 truncate">
          <Move className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
          <span className={`w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center font-bold ${isFocused ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
            {step.stepNumber}
          </span>
          <span className="truncate">{step.shortTitle}</span>
        </div>

        <div className="flex items-center gap-1 no-drag">
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyDirectLink(step.id);
            }}
            className="p-1 rounded-lg hover:bg-black/10 text-current transition-colors"
            title="Copy Direct Link สำหรับหน้านี้"
          >
            <Link className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              selectStep(step.id, 'REAL_APP');
            }}
            className="p-1 rounded-lg hover:bg-black/10 text-current transition-colors"
            title="ขยายเปิดแบบ Real App View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Mockup Shell (Pastel White Glass Shell) */}
      <div
        className={`w-[375px] h-[760px] bg-slate-950 rounded-[44px] border-[10px] ${isFocused ? 'border-indigo-500 shadow-2xl shadow-indigo-500/25 ring-4 ring-indigo-500/30' : 'border-slate-900 shadow-xl'} flex flex-col overflow-hidden relative transition-all duration-300`}
      >
        {/* Mobile Notch & Status Bar */}
        <div className="h-8 bg-slate-950 px-6 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none z-20 flex-shrink-0 no-drag">
          <span>09:41</span>
          <div className="w-24 h-4 bg-black rounded-full mx-auto -mt-1 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Mobile Screen Viewport with Inline Live Editing */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-indigo-50 via-purple-50 to-slate-50 text-slate-900 relative no-drag">
          {renderViewContent()}
        </div>

        {/* Mobile Bottom Home Indicator Bar */}
        <div className="h-4 bg-slate-950 flex items-center justify-center flex-shrink-0 z-20 no-drag">
          <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
