import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PdpaSwipeGame = ({ gameData, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const cards = gameData?.cards || [];
  const currentCard = cards[currentIdx];

  const handleChoice = (chosenSafe) => {
    if (feedback) return;

    const isCorrect = chosenSafe === currentCard.isSafe;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    setFeedback({
      isCorrect,
      explanation: currentCard.explanation
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx < cards.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setIsCompleted(true);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        if (onFinish) onFinish(Math.round((newScore / cards.length) * 100));
      }
    }, 1800);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setFeedback(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 rounded-[32px] p-5 border border-amber-200/80 shadow-xl text-slate-900">
      <div className="flex items-center justify-between mb-3 border-b border-amber-200/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-amber-500 text-white font-bold shadow-md shadow-amber-500/30">
            🛡️
          </span>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{gameData?.title || 'PDPA Swipe Card'}</h4>
            <span className="text-[10px] text-slate-500 font-medium">ประเมินความเสี่ยงสิทธิความเป็นส่วนตัว</span>
          </div>
        </div>
        {!isCompleted && (
          <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
            Card {currentIdx + 1}/{cards.length}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
        {gameData?.instruction}
      </p>

      {!isCompleted ? (
        <div className="flex flex-col items-center">
          {/* Main Swipeable Card */}
          <div className={`w-full bg-white/90 backdrop-blur-xl rounded-[28px] p-6 border-2 shadow-xl transition-all duration-300 min-h-[160px] flex flex-col justify-center items-center text-center relative ${feedback ? (feedback.isCorrect ? 'border-emerald-500 bg-emerald-50/90' : 'border-rose-500 bg-rose-50/90') : 'border-amber-200 hover:border-amber-400'}`}>
            <span className="text-xs font-extrabold text-amber-700 block mb-2 uppercase tracking-wider">
              สถานการณ์ที่ {currentIdx + 1}
            </span>
            <p className="text-sm font-bold text-slate-900 leading-relaxed max-w-xs">
              "{currentCard?.text}"
            </p>

            {/* Instant Feedback Overlay */}
            {feedback && (
              <div className="mt-3 p-2.5 rounded-2xl bg-white/90 border border-slate-200 text-xs font-bold animate-in zoom-in-95 duration-200">
                {feedback.isCorrect ? (
                  <span className="text-emerald-700 flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4" /> {feedback.explanation}
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center justify-center gap-1">
                    <XCircle className="w-4 h-4" /> {feedback.explanation}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Choice Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full mt-4">
            <button
              disabled={!!feedback}
              onClick={() => handleChoice(false)}
              className="py-3 px-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 disabled:opacity-50 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>❌ เสี่ยงขัด PDPA</span>
            </button>

            <button
              disabled={!!feedback}
              onClick={() => handleChoice(true)}
              className="py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 disabled:opacity-50 transition-all hover:scale-105"
            >
              <span>✅ ปลอดภัยตามกฎหมาย</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Game Summary View */
        <div className="text-center py-4 bg-white/90 backdrop-blur-xl rounded-[28px] p-6 border border-amber-200 shadow-md">
          <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-200 shadow-md">
            <Award className="w-7 h-7" />
          </div>
          <h5 className="text-base font-extrabold text-slate-900 mb-1">ผ่านด่าน PDPA Master!</h5>
          <p className="text-xs text-slate-500 mb-4">บันทึกคะแนนสมรรถนะการวิเคราะห์ความเสี่ยง PDPA</p>

          <div className="inline-block bg-amber-50 px-6 py-2.5 rounded-2xl border border-amber-200 mb-4">
            <span className="text-2xl font-extrabold text-amber-700 font-mono">
              {score} / {cards.length}
            </span>
            <span className="text-xs text-slate-600 block">คะแนนที่ได้ ({Math.round((score / cards.length) * 100)}%)</span>
          </div>

          <div>
            <button
              onClick={handleRestart}
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
