import React, { useState } from 'react';
import { Sparkles, CheckCircle, XCircle, RotateCcw, Award, Link2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AiPedagogyMatchGame = ({ gameData, onFinish }) => {
  const pairs = gameData?.pairs || [];
  const [selectedTool, setSelectedTool] = useState(null);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectTool = (pair) => {
    if (matches[pair.id]) return;
    setSelectedTool(pair);
  };

  const handleSelectGoal = (pair) => {
    if (!selectedTool) return;

    const isMatch = selectedTool.id === pair.id;
    const newMatches = {
      ...matches,
      [selectedTool.id]: { matchedWith: pair.id, isMatch }
    };

    setMatches(newMatches);
    if (isMatch) {
      setScore(prev => prev + 1);
    }
    setSelectedTool(null);

    if (Object.keys(newMatches).length === pairs.length) {
      const finalScore = score + (isMatch ? 1 : 0);
      setTimeout(() => {
        setIsFinished(true);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        if (onFinish) onFinish(Math.round((finalScore / pairs.length) * 100));
      }, 800);
    }
  };

  const handleReset = () => {
    setSelectedTool(null);
    setMatches({});
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-purple-500/10 rounded-[32px] p-5 border border-purple-200/80 shadow-xl text-slate-900">
      <div className="flex items-center justify-between mb-3 border-b border-purple-200/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30">
            🤖
          </span>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{gameData?.title || 'AI Pedagogy Match'}</h4>
            <span className="text-[10px] text-slate-500 font-medium">จับคู่เครื่องมือ AI กับเป้าหมายการสอน</span>
          </div>
        </div>
        <span className="text-xs font-mono font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full border border-purple-200">
          {Object.keys(matches).length}/{pairs.length} Matched
        </span>
      </div>

      <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
        {gameData?.instruction}
      </p>

      {!isFinished ? (
        <div className="grid grid-cols-2 gap-3">
          {/* Left Column: AI Tools */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold text-purple-700 block uppercase tracking-wider text-center">
              1. เลือกเครื่องมือ AI
            </span>
            {pairs.map((p) => {
              const status = matches[p.id];
              const isSelected = selectedTool?.id === p.id;

              return (
                <button
                  key={p.id}
                  disabled={!!status}
                  onClick={() => handleSelectTool(p)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${isSelected ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-400 scale-105' : status ? (status.isMatch ? 'bg-emerald-50 text-emerald-900 border-emerald-500 opacity-80' : 'bg-rose-50 text-rose-900 border-rose-400') : 'bg-white/90 text-slate-800 border-slate-200 hover:border-purple-300'}`}
                >
                  <span className="truncate">{p.tool}</span>
                  {status && (status.isMatch ? <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />)}
                </button>
              );
            })}
          </div>

          {/* Right Column: Pedagogy Goals */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold text-purple-700 block uppercase tracking-wider text-center">
              2. จับคู่กับเป้าหมายการสอน
            </span>
            {pairs.map((p) => {
              const status = Object.values(matches).find(m => m.matchedWith === p.id);

              return (
                <button
                  key={p.id}
                  disabled={!selectedTool || !!status}
                  onClick={() => handleSelectGoal(p)}
                  className={`w-full text-left p-3 rounded-2xl border text-[11px] leading-tight font-medium transition-all min-h-[46px] flex items-center ${selectedTool ? 'bg-purple-50 border-purple-300 hover:bg-purple-600 hover:text-white cursor-pointer shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  <span>{p.goal}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 bg-white/90 backdrop-blur-xl rounded-[28px] p-6 border border-purple-200 shadow-md">
          <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-200 shadow-md">
            <Award className="w-7 h-7" />
          </div>
          <h5 className="text-base font-extrabold text-slate-900 mb-1">จับคู่ AI ทรงพลังสำเร็จ!</h5>
          <p className="text-xs text-slate-500 mb-4">บันทึกคะแนนสมรรถนะการประยุกต์ใช้ AI ในการสอน</p>

          <div className="inline-block bg-purple-50 px-6 py-2.5 rounded-2xl border border-purple-200 mb-4">
            <span className="text-2xl font-extrabold text-purple-700 font-mono">
              {score} / {pairs.length}
            </span>
            <span className="text-xs text-slate-600 block">คะแนนที่ได้ ({Math.round((score / pairs.length) * 100)}%)</span>
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
