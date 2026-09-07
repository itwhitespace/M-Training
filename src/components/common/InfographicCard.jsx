import React, { useState } from 'react';
import { Layers, ChevronLeft, ChevronRight, CheckCircle, Info } from 'lucide-react';

export const InfographicCard = ({ infographic }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  if (!infographic) return null;

  const { title, summary, items, badge } = infographic;

  return (
    <div className="rounded-[28px] p-4 mb-5 border border-white/90 bg-white/80 backdrop-blur-xl shadow-lg shadow-indigo-500/5 text-slate-900 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-indigo-100 text-indigo-700 font-bold">
            <Layers className="w-4 h-4" />
          </span>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        </div>
        {badge && (
          <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
            {badge}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-600 mb-3">{summary}</p>

      {/* Slide / Item List */}
      {infographic.type === 'slide' ? (
        <div>
          <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/70 backdrop-blur-md rounded-2xl p-4 border border-indigo-100 mb-3 min-h-[95px] flex flex-col justify-center shadow-inner">
            <span className="text-xs font-bold text-indigo-700 mb-1 block">
              {items[activeSlide]?.label}
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {items[activeSlide]?.detail}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${idx === activeSlide ? 'w-6 bg-indigo-600' : 'w-2 bg-indigo-200'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <button
                disabled={activeSlide === 0}
                onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                className="p-1 rounded-lg hover:bg-indigo-50 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] font-semibold">
                {activeSlide + 1} / {items.length}
              </span>
              <button
                disabled={activeSlide === items.length - 1}
                onClick={() => setActiveSlide(prev => Math.min(items.length - 1, prev + 1))}
                className="p-1 rounded-lg hover:bg-indigo-50 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="bg-indigo-50/60 rounded-2xl p-3 border border-indigo-100/80 flex items-start gap-2.5">
              <div className="mt-0.5 text-emerald-600 flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">{item.label}</span>
                <span className="text-slate-600 text-[11px] leading-tight block mt-0.5">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
