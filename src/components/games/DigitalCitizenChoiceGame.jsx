import React, { useState } from 'react';
import { Globe, CheckCircle, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DigitalCitizenChoiceGame = ({ gameData, onFinish }) => {
  const scenarios = gameData?.scenarios || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentScenario = scenarios[currentIdx];

  const handleChoose = (choice) => {
    if (selectedChoice) return;

    setSelectedChoice(choice);
    const isCorrect = choice.isCorrect;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    setTimeout(() => {
      if (currentIdx < scenarios.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedChoice(null);
      } else {
        setIsFinished(true);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        if (onFinish) onFinish(Math.round((newScore / scenarios.length) * 100));
      }
    }, 2000);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedChoice(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-cyan-500/10 rounded-[32px] p-5 border border-cyan-200/80 shadow-xl text-slate-900">
      <div className="flex items-center justify-between mb-3 border-b border-cyan-200/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30">
            🌐
          </span>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{gameData?.title || 'Digital Citizen Decision'}</h4>
            <span className="text-[10px] text-slate-500 font-medium">จำลองสถานการณ์การวางตัวพลเมืองดิจิทัล</span>
          </div>
        </div>
        {!isFinished && (
          <span className="text-xs font-mono font-bold bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full border border-cyan-200">
            Scenario {currentIdx + 1}/{scenarios.length}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
        {gameData?.instruction}
      </p>

      {!isFinished ? (
        <div className="space-y-4">
          {/* Situation Box */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-cyan-200 shadow-sm text-xs font-bold text-slate-900 leading-relaxed">
            <span className="text-[10px] font-extrabold text-cyan-700 block uppercase tracking-wider mb-1">
              สถานการณ์ที่ {currentIdx + 1}:
            </span>
            "{currentScenario?.situation}"
          </div>

          {/* Choices */}
          <div className="space-y-2">
            {currentScenario?.choices.map((c, idx) => {
              const isSelected = selectedChoice === c;

              return (
                <button
                  key={idx}
                  disabled={!!selectedChoice}
                  onClick={() => handleChoose(c)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all ${isSelected ? (c.isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500' : 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500') : 'bg-white/90 border-slate-200 hover:border-cyan-400 text-slate-800'}`}
                >
                  <p>{c.text}</p>

                  {/* Feedback on selection */}
                  {isSelected && (
                    <div className={`mt-2 pt-2 border-t text-[11px] font-bold ${c.isCorrect ? 'border-emerald-200 text-emerald-700' : 'border-rose-200 text-rose-700'}`}>
                      {c.feedback}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 bg-white/90 backdrop-blur-xl rounded-[28px] p-6 border border-cyan-200 shadow-md">
          <div className="w-14 h-14 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-200 shadow-md">
            <Award className="w-7 h-7" />
          </div>
          <h5 className="text-base font-extrabold text-slate-900 mb-1">พลเมืองดิจิทัลต้นแบบผ่าน!</h5>
          <p className="text-xs text-slate-500 mb-4">บันทึกคะแนนการตัดสินใจเชิงจริยธรรมบนโลกออนไลน์</p>

          <div className="inline-block bg-cyan-50 px-6 py-2.5 rounded-2xl border border-cyan-200 mb-4">
            <span className="text-2xl font-extrabold text-cyan-700 font-mono">
              {score} / {scenarios.length}
            </span>
            <span className="text-xs text-slate-600 block">คะแนนที่ได้ ({Math.round((score / scenarios.length) * 100)}%)</span>
          </div>

          <div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-extrabold rounded-full text-xs flex items-center justify-center gap-1.5 mx-auto shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" /> เล่นใหม่อีกครั้ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
