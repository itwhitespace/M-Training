import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Award, Sparkles, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OnboardingView = () => {
  const { selectStep } = useApp();

  return (
    <div className="p-4 text-slate-900 space-y-4">
      {/* Hero Area (Matching Specification 4: 3D glowing mascot sphere & call-to-action pill button) */}
      <div className="rounded-[36px] p-6 glass-card-ios border border-white/90 shadow-xl shadow-indigo-500/10 text-center flex flex-col items-center relative overflow-hidden">
        {/* Subtle Ambient Light Orb behind mascot */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* 3D Glowing Sphere Mascot */}
        <div className="w-24 h-24 rounded-full iridescent-sphere flex items-center justify-center mb-4 shadow-2xl relative group cursor-pointer hover:scale-105 transition-transform">
          <Sparkles className="w-10 h-10 text-white animate-pulse" />
          
          {/* Floating AI Powered Pill Badge */}
          <div className="absolute -bottom-2 bg-slate-950/90 text-purple-200 text-[10px] font-bold px-3 py-1 rounded-full border border-purple-400/40 shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-300" /> AI Powered
          </div>
        </div>

        <span className="bg-indigo-600/10 text-indigo-700 text-[11px] font-bold px-3 py-1 rounded-full border border-indigo-200/80 inline-flex items-center gap-1.5 mb-2 mt-1">
          <ShieldCheck className="w-3.5 h-3.5" /> UNESCO Competency Framework
        </span>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 leading-tight">
          How are you learning <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Digital Citizenship today?
          </span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed mb-5 max-w-xs font-medium">
          พัฒนาสมรรถนะครูดิจิทัล รองรับทฤษฎี Mosher & Gottfredson Level 2 (Apply) & Level 3 (Solve)
        </p>

        {/* Prominent Glossy Dark CTA Pill Button (Matching specification 3) */}
        <button
          onClick={() => selectStep('module-1')}
          className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-full text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-950/25 hover:scale-[1.02]"
        >
          <MessageCircle className="w-4 h-4 text-purple-400" />
          <span>Chat & Learn Module 1</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3-Week Training Roadmap Container */}
      <div className="glass-card-ios rounded-[32px] p-5 border border-white/90 shadow-md space-y-3">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold">
            <Calendar className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">แผนการอบรม 3 สัปดาห์ (3-Week Roadmap)</h3>
            <span className="text-[11px] text-slate-500 font-medium">ใช้เวลาอบรมสะสมสมรรถนะไม่เกิน 3 สัปดาห์</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {/* Week 1 */}
          <div className="bg-gradient-to-r from-indigo-50/90 to-purple-50/70 p-3.5 rounded-[24px] border border-indigo-100/90 flex items-start gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-mono text-xs font-extrabold flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
              W1
            </div>
            <div className="text-xs flex-1">
              <span className="font-extrabold text-slate-900 block">สัปดาห์ที่ 1: Safety & Emotional Well-being</span>
              <span className="text-slate-600 text-[11px] font-medium">กฎหมาย PDPA สิทธิความเป็นส่วนตัว และการจัดการ Burnout</span>
              <div className="flex gap-3 mt-2">
                <button onClick={() => selectStep('module-1')} className="text-[11px] font-extrabold text-indigo-600 hover:underline">Module 1</button>
                <span className="text-slate-300">•</span>
                <button onClick={() => selectStep('module-2')} className="text-[11px] font-extrabold text-emerald-600 hover:underline">Module 2</button>
              </div>
            </div>
          </div>

          {/* Week 2 */}
          <div className="bg-gradient-to-r from-purple-50/90 to-pink-50/70 p-3.5 rounded-[24px] border border-purple-100/90 flex items-start gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white font-mono text-xs font-extrabold flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
              W2
            </div>
            <div className="text-xs flex-1">
              <span className="font-extrabold text-slate-900 block">สัปดาห์ที่ 2: Creativity & Professional Agency</span>
              <span className="text-slate-600 text-[11px] font-medium">นวัตกรรมการสอนด้วย AI (TPACK) และอัตลักษณ์ครูดิจิทัล</span>
              <div className="flex gap-3 mt-2">
                <button onClick={() => selectStep('module-3')} className="text-[11px] font-extrabold text-purple-600 hover:underline">Module 3</button>
                <span className="text-slate-300">•</span>
                <button onClick={() => selectStep('module-4')} className="text-[11px] font-extrabold text-cyan-600 hover:underline">Module 4</button>
              </div>
            </div>
          </div>

          {/* Week 3 */}
          <div className="bg-gradient-to-r from-amber-50/90 to-orange-50/70 p-3.5 rounded-[24px] border border-amber-100/90 flex items-start gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 font-mono text-xs font-extrabold flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20">
              W3
            </div>
            <div className="text-xs flex-1">
              <span className="font-extrabold text-slate-900 block">สัปดาห์ที่ 3: Assessment & Competency Evaluation</span>
              <span className="text-slate-600 text-[11px] font-medium">ทำแบบประเมินหลังเรียน Post-test และรับใบประกาศนียบัตร UNESCO</span>
              <div className="mt-2">
                <button onClick={() => selectStep('assessment')} className="text-[11px] font-extrabold text-amber-600 hover:underline">แบบประเมินสมรรถนะ</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competency Evaluation Criteria Card */}
      <div className="glass-card-ios rounded-[32px] p-4 border border-white/90 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-extrabold text-slate-900">เกณฑ์การประเมินผลสัมฤทธิ์</h4>
        </div>
        <ul className="text-xs text-slate-600 font-medium space-y-1.5 list-disc list-inside">
          <li>ศึกษาเนื้อหา Infographic และชม Video ในทุก Module</li>
          <li>ผ่านแบบฝึกหัดย่อยประจำโมดูล (คะแนนรวมเกิน 80%)</li>
          <li>ผ่านแบบประเมินหลังเรียน (Post-test) 5 ข้อ เพื่อออก Certificate</li>
        </ul>
      </div>
    </div>
  );
};
