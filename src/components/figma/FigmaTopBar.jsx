import React from 'react';
import { Layout, Smartphone, ZoomIn, ZoomOut, Link, Grid2X2, Grid3X3, Columns, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FLOW_STEPS } from '../../data/modulesData';

export const FigmaTopBar = () => {
  const { currentMode, switchMode, zoomScale, setZoomScale, canvasLayout, setCanvasLayout, activeStepId, copyDirectLink } = useApp();

  const activeStep = FLOW_STEPS.find(s => s.id === activeStepId) || FLOW_STEPS[0];

  return (
    <div className="h-14 bg-white/80 backdrop-blur-md border-b border-indigo-100 px-4 flex items-center justify-between text-slate-800 select-none z-30 relative shadow-sm">
      {/* Left: File Title & Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shadow-md shadow-indigo-500/20">
            F
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 tracking-wide">
                M-Training Digital Citizenship (UNESCO)
              </span>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
                PROTOTYPE CANVAS
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block">
              6-Step Learning Flow • Focused: <strong className="text-indigo-600 font-semibold">{activeStep.shortTitle}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Center: Canvas Layout & Zoom Controls */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Column Grid Layout Selector */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 text-xs">
          <span className="text-[10px] font-semibold text-slate-500 px-2 uppercase tracking-wider">Layout:</span>
          <button
            onClick={() => setCanvasLayout('1_ROW')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all ${canvasLayout === '1_ROW' ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            title="วางเรียง 1 แถวแนวนอน (6 คอลัมน์)"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>1 แถว</span>
          </button>
          <button
            onClick={() => setCanvasLayout('2_COLS')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all ${canvasLayout === '2_COLS' ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            title="แสดงเป็น 2 คอลัมน์ (3 แถว)"
          >
            <Grid2X2 className="w-3.5 h-3.5" />
            <span>2 คอลัมน์</span>
          </button>
          <button
            onClick={() => setCanvasLayout('3_COLS')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all ${canvasLayout === '3_COLS' ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            title="แสดงเป็น 3 คอลัมน์ (2 แถว)"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>3 คอลัมน์</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-100/90 px-2.5 py-1 rounded-xl border border-slate-200/80 text-xs">
          <button
            onClick={() => setZoomScale(prev => Math.max(0.4, prev - 0.1))}
            className="p-1 hover:bg-slate-200 rounded text-slate-600 hover:text-slate-900"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] text-slate-700 w-10 text-center font-semibold">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            onClick={() => setZoomScale(prev => Math.min(1.4, prev + 0.1))}
            className="p-1 hover:bg-slate-200 rounded text-slate-600 hover:text-slate-900"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomScale(1)}
            className="text-[10px] text-slate-500 hover:text-indigo-600 border-l border-slate-300 pl-1.5 ml-0.5"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Right: Copy Link & Mode Switch Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => copyDirectLink(activeStepId)}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-indigo-200 shadow-sm flex items-center gap-1.5 transition-all"
        >
          <Link className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">Copy Direct Link</span>
        </button>

        {/* PRIMARY SWITCH BUTTON */}
        <button
          onClick={() => switchMode(currentMode === 'FIGMA_CANVAS' ? 'REAL_APP' : 'FIGMA_CANVAS')}
          className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2 border border-indigo-400/30 transition-all transform hover:scale-[1.02]"
        >
          {currentMode === 'FIGMA_CANVAS' ? (
            <>
              <Smartphone className="w-4 h-4" />
              <span>Switch to Real App View</span>
            </>
          ) : (
            <>
              <Layout className="w-4 h-4" />
              <span>Switch to Figma Canvas Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
