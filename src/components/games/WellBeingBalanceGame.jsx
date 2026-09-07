import React, { useState } from 'react';
import { HeartPulse, Scale, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WellBeingBalanceGame = ({ gameData, onFinish }) => {
  const items = gameData?.items || [];
  const [sortedItems, setSortedItems] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSortItem = (item, chosenCategory) => {
    if (sortedItems[item.id]) return;

    const isCorrect = item.type === chosenCategory;
    const newSorted = {
      ...sortedItems,
      [item.id]: { category: chosenCategory, isCorrect }
    };

    setSortedItems(newSorted);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (Object.keys(newSorted).length === items.length) {
      const finalScore = score + (isCorrect ? 1 : 0);
      setTimeout(() => {
        setIsFinished(true);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        if (onFinish) onFinish(Math.round((finalScore / items.length) * 100));
      }, 800);
    }
  };

  const handleReset = () => {
    setSortedItems({});
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/10 rounded-[32px] p-5 border border-emerald-200/80 shadow-xl text-slate-900">
      <div className="flex items-center justify-between mb-3 border-b border-emerald-200/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30">
            🌱
          </span>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{gameData?.title || 'Work-Life Balance Sorter'}</h4>
            <span className="text-[10px] text-slate-500 font-medium">แยกหมวดหมู่งานเพื่อสุขภาพจิตที่ดี</span>
          </div>
        </div>
        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
          {Object.keys(sortedItems).length}/{items.length} Sorted
        </span>
      </div>

      <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
        {gameData?.instruction}
      </p>

      {!isFinished ? (
        <div className="space-y-3">
          {/* Work vs Health Buckets Header */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-extrabold mb-1">
            <div className="bg-rose-100/90 text-rose-800 p-2 rounded-2xl border border-rose-200 shadow-sm flex items-center justify-center gap-1">
              <span>💼 ภาระงานเสี่ยงเครียด</span>
            </div>
            <div className="bg-emerald-100/90 text-emerald-800 p-2 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-center gap-1">
              <span>🧘‍♂️ สุขภาวะ & พักผ่อน</span>
            </div>
          </div>

          {/* Cards to sort */}
          <div className="space-y-2">
            {items.map((item) => {
              const status = sortedItems[item.id];

              return (
                <div
                  key={item.id}
                  className={`bg-white/90 backdrop-blur-xl p-3 rounded-2xl border shadow-sm flex items-center justify-between gap-2 transition-all ${status ? (status.isCorrect ? 'border-emerald-500 bg-emerald-50/70' : 'border-rose-400 bg-rose-50/70') : 'border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 flex-1">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>

                  {!status ? (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleSortItem(item, 'work')}
                        className="px-2.5 py-1 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] shadow"
                      >
                        💼 งาน
                      </button>
                      <button
                        onClick={() => handleSortItem(item, 'health')}
                        className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] shadow"
                      >
                        🧘‍♂️ สุขภาวะ
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs font-bold flex-shrink-0">
                      {status.isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> ถูกต้อง
                        </span>
                      ) : (
                        <span className="text-rose-600 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> ผิดหมวด
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 bg-white/90 backdrop-blur-xl rounded-[28px] p-6 border border-emerald-200 shadow-md">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-md">
            <Award className="w-7 h-7" />
          </div>
          <h5 className="text-base font-extrabold text-slate-900 mb-1">สมดุลชีวิตครูดิจิทัลผ่าน!</h5>
          <p className="text-xs text-slate-500 mb-4">บันทึกคะแนนสมรรถนะการบริหารเวลาและสุขภาวะ</p>

          <div className="inline-block bg-emerald-50 px-6 py-2.5 rounded-2xl border border-emerald-200 mb-4">
            <span className="text-2xl font-extrabold text-emerald-700 font-mono">
              {score} / {items.length}
            </span>
            <span className="text-xs text-slate-600 block">คะแนนที่ได้ ({Math.round((score / items.length) * 100)}%)</span>
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
