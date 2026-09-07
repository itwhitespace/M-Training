import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InteractiveQuiz = ({ questions, moduleId, onComplete }) => {
  const { markModuleCompleted } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOpt(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null) return;

    const isCorrect = selectedOpt === currentQ.correctAnswer;
    setIsAnswered(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: { selected: selectedOpt, isCorrect }
    }));
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScorePct = Math.round(((score + (selectedOpt === currentQ.correctAnswer ? 1 : 0)) / questions.length) * 100);
      markModuleCompleted(moduleId, finalScorePct);
      if (onComplete) onComplete(finalScorePct);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setUserAnswers({});
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-4 border border-white/90 shadow-lg shadow-indigo-500/5 mb-5 text-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-indigo-100/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-indigo-100 text-indigo-700 font-bold">
            <HelpCircle className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-slate-900">แบบฝึกหัดย่อยทบทวนสมรรถนะ</h4>
            <span className="text-[11px] text-slate-500">ประเมินระดับความรู้ความเข้าใจ</span>
          </div>
        </div>
        {!isFinished && (
          <span className="text-xs font-mono bg-indigo-100 px-3 py-1 rounded-full text-indigo-700 font-bold">
            ข้อ {currentIdx + 1}/{questions.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div>
          <h5 className="text-xs sm:text-sm font-bold text-slate-900 mb-4 leading-relaxed bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100">
            {currentQ.question}
          </h5>

          <div className="space-y-2 mb-4">
            {currentQ.options.map((opt, idx) => {
              let optStyle = "bg-white border-indigo-100 hover:border-indigo-300 text-slate-700 shadow-sm";

              if (selectedOpt === idx) {
                optStyle = "bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-1 ring-indigo-500";
              }

              if (isAnswered) {
                if (idx === currentQ.correctAnswer) {
                  optStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                } else if (selectedOpt === idx && selectedOpt !== currentQ.correctAnswer) {
                  optStyle = "bg-rose-50 border-rose-500 text-rose-900";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
                >
                  <span className="flex-1 pr-2">{opt}</span>
                  {isAnswered && idx === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                  {isAnswered && selectedOpt === idx && selectedOpt !== currentQ.correctAnswer && (
                    <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={`p-3.5 rounded-2xl border mb-4 text-xs ${selectedOpt === currentQ.correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
              <div className="font-bold mb-1 flex items-center gap-1">
                {selectedOpt === currentQ.correctAnswer ? (
                  <span className="text-emerald-700">✓ ถูกต้อง! คำอธิบายตามกรอบสมรรถนะ:</span>
                ) : (
                  <span className="text-rose-700">✗ ยังไม่ถูกต้อง! คำอธิบายตามกรอบสมรรถนะ:</span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex justify-end pt-1">
            {!isAnswered ? (
              <button
                disabled={selectedOpt === null}
                onClick={handleSubmitAnswer}
                className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-white rounded-full text-xs font-bold transition-all shadow-md"
              >
                ยืนยันคำตอบ
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-indigo-500/20"
              >
                {currentIdx < questions.length - 1 ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน'} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-200 shadow-md">
            <Award className="w-7 h-7" />
          </div>
          <h5 className="text-sm font-bold text-slate-900 mb-1">ทำแบบฝึกหัดเสร็จสิ้น!</h5>
          <p className="text-xs text-slate-500 mb-3">บันทึกผลคะแนนเข้าสู่ระบบประเมินสมรรถนะครูเรียบร้อย</p>

          <div className="inline-block bg-indigo-50 px-6 py-2.5 rounded-2xl border border-indigo-100 mb-4">
            <span className="text-2xl font-bold text-indigo-700 font-mono">
              {score} / {questions.length}
            </span>
            <span className="text-xs text-slate-600 block">คะแนนที่ได้ ({Math.round((score / questions.length) * 100)}%)</span>
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-indigo-100 rounded-full text-xs font-bold shadow-sm"
            >
              ทำใหม่อีกครั้ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
