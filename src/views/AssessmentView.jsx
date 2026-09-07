import React, { useState } from 'react';
import { Award, ArrowRight, ShieldCheck, RefreshCw, FileCheck } from 'lucide-react';
import { COMPETENCY_POST_TEST } from '../data/modulesData';
import { useApp } from '../context/AppContext';

export const AssessmentView = () => {
  const { setPostTestScore, setIsCertificateIssued, setShowCertificateModal } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = COMPETENCY_POST_TEST;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (index) => {
    setSelectedOpt(index);
  };

  const handleNextQuestion = () => {
    if (selectedOpt === null) return;

    const isCorrect = selectedOpt === currentQ.correctAnswer;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    setUserAnswers(prev => ({
      ...prev,
      [currentIdx]: { selected: selectedOpt, isCorrect }
    }));

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
      const finalPct = Math.round((newScore / questions.length) * 100);
      setPostTestScore(finalPct);

      if (finalPct >= 80) {
        setIsCertificateIssued(true);
        setShowCertificateModal(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setUserAnswers({});
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="p-4 text-slate-900 space-y-4">
      <div className="bg-gradient-to-br from-amber-100/90 via-orange-50 to-amber-50 p-5 rounded-[28px] border border-white/90 shadow-lg shadow-amber-500/10">
        <div className="flex items-center gap-1.5 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" /> UNESCO Competency Post-Test
        </div>
        <h2 className="text-base font-extrabold text-slate-900 mb-1">แบบประเมินสมรรถนะครูดิจิทัลหลังเรียน</h2>
        <p className="text-xs text-slate-600">
          ประเมินความรู้ 4 โมดูลตามกรอบสมรรถนะ UNESCO และทฤษฎี Mosher Level 2 & 3 (เกณฑ์ผ่าน 80% เพื่อรับใบรับรอง)
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-4 border border-white/90 shadow-lg shadow-indigo-500/5">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3 mb-4 text-xs">
            <span className="text-indigo-700 font-bold">{currentQ.domain}</span>
            <span className="font-mono text-slate-500 font-bold bg-indigo-100 px-3 py-0.5 rounded-full">
              ข้อ {currentIdx + 1}/{questions.length}
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-4 bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-2 mb-5">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all ${selectedOpt === idx ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-1 ring-indigo-500 shadow-sm' : 'bg-white border-indigo-100 hover:border-indigo-300 text-slate-700'}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-1">
            <button
              disabled={selectedOpt === null}
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-white font-bold rounded-full text-xs flex items-center gap-1.5 shadow-xl shadow-slate-950/20 transition-all"
            >
              {currentIdx < questions.length - 1 ? 'ข้อถัดไป' : 'ส่งแบบทดสอบ & ออกใบรับรอง'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 border border-white/90 text-center shadow-lg shadow-indigo-500/5">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-200 shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 mb-1">สรุปผลการประเมินสมรรถนะ</h3>
          <p className="text-xs text-slate-500 mb-4">เกณฑ์การผ่าน 80% (4/5 ข้อ)</p>

          <div className="inline-block bg-indigo-50 px-8 py-3 rounded-2xl border border-indigo-100 mb-4">
            <span className="text-3xl font-bold text-indigo-700 font-mono">
              {Math.round((score / questions.length) * 100)}%
            </span>
            <span className="text-xs text-slate-600 block font-mono mt-0.5">
              ({score} จาก {questions.length} ข้อ)
            </span>
          </div>

          {score / questions.length >= 0.8 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mb-5 text-emerald-900 text-xs">
              🎉 **ยินดีด้วย! คุณสอบผ่านตามเกณฑ์สมรรถนะครูดิจิทัล UNESCO** <br />
              ระบบได้ออกใบรับรอง Digital Citizenship Certificate ให้คุณเรียบร้อยแล้ว
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 mb-5 text-rose-900 text-xs">
              คุณได้คะแนนน้อยกว่า 80% แนะนำให้ลองทบทวนเนื้อหาและทำใหม่อีกครั้ง
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-indigo-100 rounded-full text-xs font-bold shadow-sm flex items-center justify-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> ทำแบบทดสอบใหม่
            </button>
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-xs flex items-center justify-center gap-1 shadow-lg shadow-indigo-500/25"
            >
              <FileCheck className="w-4 h-4" /> ดูใบรับรอง Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
