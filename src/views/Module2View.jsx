import React from 'react';
import { HeartPulse, ChevronRight } from 'lucide-react';
import { MODULES_CONTENT } from '../data/modulesData';
import { InfographicCard } from '../components/common/InfographicCard';
import { VideoPlayer } from '../components/common/VideoPlayer';
import { ExternalResources } from '../components/common/ExternalResources';
import { InteractiveQuiz } from '../components/common/InteractiveQuiz';
import { useApp } from '../context/AppContext';

export const Module2View = () => {
  const content = MODULES_CONTENT['module-2'];
  const { selectStep } = useApp();

  return (
    <div className="p-4 text-slate-900 space-y-4">
      <div className="bg-gradient-to-br from-emerald-100/90 via-teal-50 to-emerald-50 p-5 rounded-[28px] border border-white/90 shadow-lg shadow-emerald-500/10">
        <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider mb-1">
          <HeartPulse className="w-4 h-4" /> {content.unescoCompetency}
        </div>
        <h2 className="text-base font-extrabold text-slate-900 mb-1">Module 2: {content.title}</h2>
        <p className="text-xs text-slate-600 mb-3">{content.subtitle}</p>
        <span className="text-[10px] bg-white text-emerald-800 font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm inline-block">
          {content.mosherConcept}
        </span>
      </div>

      {content.infographics?.map((info) => (
        <InfographicCard key={info.id} infographic={info} />
      ))}

      <VideoPlayer video={content.video} />
      <ExternalResources resources={content.resources} />
      <InteractiveQuiz questions={content.quiz} moduleId="module-2" />

      <div className="pt-2">
        <button
          onClick={() => selectStep('module-3')}
          className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-slate-950/20"
        >
          <span>ไปที่ Module 3: Digital Creativity</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
