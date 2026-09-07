import React from 'react';
import { FLOW_STEPS } from '../../data/modulesData';
import { useApp } from '../../context/AppContext';
import { Link, CheckCircle2, ShieldCheck, Columns, Grid2X2, Grid3X3 } from 'lucide-react';

export const FigmaSidebar = () => {
  const { activeStepId, selectStep, copyDirectLink, completedModules, canvasLayout, setCanvasLayout } = useApp();

  return (
    <aside className="w-72 bg-white/70 backdrop-blur-md border-r border-indigo-100 flex flex-col h-[calc(100vh-3.5rem)] text-slate-700 select-none z-20 flex-shrink-0 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-indigo-100/80">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
          Learning Flow Steps
        </span>
        <h3 className="text-xs font-bold text-slate-900">
          โครงสร้าง 6 ขั้นตอน M-Training
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          คลิกเพื่อ Focus และกด Copy Direct Link รายหน้า
        </p>

        {/* Layout Switcher Buttons in Sidebar */}
        <div className="mt-3 pt-2.5 border-t border-indigo-100/60">
          <span className="text-[10px] font-semibold text-slate-500 block mb-1.5 uppercase">
            รูปแบบแสดงผล Canvas Grid:
          </span>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setCanvasLayout('1_ROW')}
              className={`py-1 text-[10px] font-semibold rounded-lg flex items-center justify-center gap-1 transition-all ${canvasLayout === '1_ROW' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
              title="1 แถวแนวนอน"
            >
              <Columns className="w-3 h-3" /> 1 แถว
            </button>
            <button
              onClick={() => setCanvasLayout('2_COLS')}
              className={`py-1 text-[10px] font-semibold rounded-lg flex items-center justify-center gap-1 transition-all ${canvasLayout === '2_COLS' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
              title="2 คอลัมน์"
            >
              <Grid2X2 className="w-3 h-3" /> 2 คอลัมน์
            </button>
            <button
              onClick={() => setCanvasLayout('3_COLS')}
              className={`py-1 text-[10px] font-semibold rounded-lg flex items-center justify-center gap-1 transition-all ${canvasLayout === '3_COLS' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
              title="3 คอลัมน์"
            >
              <Grid3X3 className="w-3 h-3" /> 3 คอลัมน์
            </button>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {FLOW_STEPS.map((step) => {
          const isActive = activeStepId === step.id;
          const isDone = completedModules.includes(step.id);

          return (
            <div
              key={step.id}
              onClick={() => selectStep(step.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer group relative ${isActive ? 'bg-white border-indigo-500 shadow-md shadow-indigo-500/10 text-slate-900 ring-1 ring-indigo-500' : 'bg-white/60 hover:bg-white border-indigo-100/70 text-slate-700 hover:shadow-sm'}`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'}`}
                  >
                    {step.stepNumber}
                  </span>
                  <span className="text-xs font-bold truncate max-w-[140px]">
                    {step.shortTitle}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyDirectLink(step.id);
                  }}
                  className="p-1 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"
                  title="Copy Direct Link สำหรับหน้านี้"
                >
                  <Link className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {step.desc}
              </p>

              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-indigo-600 font-semibold truncate max-w-[150px]">
                  {step.unescoDomain}
                </span>
                {isDone && (
                  <span className="text-emerald-600 flex items-center gap-0.5 font-bold">
                    <CheckCircle2 className="w-3 h-3" /> ผ่านแล้ว
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Framework Summary Footer */}
      <div className="p-3.5 bg-indigo-50/60 border-t border-indigo-100 text-[11px] space-y-1">
        <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
          <ShieldCheck className="w-3.5 h-3.5" /> Mosher & Gottfredson Model
        </div>
        <p className="text-[10px] text-slate-600 leading-tight">
          รองรับการประยุกต์ใช้ (Apply) และการแก้ปัญหาเฉพาะหน้า (Solve Problem) ในการอบรมครู 3 สัปดาห์
        </p>
      </div>
    </aside>
  );
};
