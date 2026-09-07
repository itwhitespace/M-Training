import React, { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { InfographicCard } from './InfographicCard';
import { PdpaSwipeGame } from '../games/PdpaSwipeGame';
import { WellBeingBalanceGame } from '../games/WellBeingBalanceGame';
import { AiPedagogyMatchGame } from '../games/AiPedagogyMatchGame';
import { DigitalCitizenChoiceGame } from '../games/DigitalCitizenChoiceGame';
import { CheckCircle2, ArrowRight, ArrowLeft, Award, HelpCircle, Sparkles, Check, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EditableText } from './EditableText';
import confetti from 'canvas-confetti';

export const Module4StepContainer = ({ moduleId, content }) => {
  const { markModuleCompleted } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  // Quiz state (1 question per screen)
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = content?.quiz || [];
  const currentQuizQ = quizQuestions[quizIdx];

  const handleSelectQuizOpt = (optIndex) => {
    if (isAnswered) return;
    setSelectedOpt(optIndex);
  };

  const handleConfirmQuizAnswer = () => {
    if (selectedOpt === null) return;

    const isCorrect = selectedOpt === currentQuizQ.correctAnswer;
    setIsAnswered(true);
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQ = () => {
    if (quizIdx < quizQuestions.length - 1) {
      setQuizIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const finalScorePct = Math.round(((quizScore + (selectedOpt === currentQuizQ.correctAnswer ? 1 : 0)) / quizQuestions.length) * 100);
      markModuleCompleted(moduleId, finalScorePct);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    setQuizIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Render appropriate Mini-Game for the module
  const renderMiniGame = () => {
    switch (moduleId) {
      case 'module-1':
        return <PdpaSwipeGame gameData={content.gameData} onFinish={() => {}} />;
      case 'module-2':
        return <WellBeingBalanceGame gameData={content.gameData} onFinish={() => {}} />;
      case 'module-3':
        return <AiPedagogyMatchGame gameData={content.gameData} onFinish={() => {}} />;
      case 'module-4':
        return <DigitalCitizenChoiceGame gameData={content.gameData} onFinish={() => {}} />;
      default:
        return <PdpaSwipeGame gameData={content.gameData} onFinish={() => {}} />;
    }
  };

  return (
    <div className="p-4 text-slate-900 space-y-4">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-xl p-5 rounded-[28px] border border-white/90 shadow-lg shadow-indigo-500/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
            {content.unescoCompetency}
          </span>
          {content.badgeName && (
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
              {content.badgeName}
            </span>
          )}
        </div>

        <h2 className="text-base font-extrabold text-slate-900 mb-1">
          {content.title.startsWith('Module') ? '' : `Module: `}
          <EditableText stepId={moduleId} fieldKey="title" defaultText={content.title} />
        </h2>
        <p className="text-xs text-slate-600 mb-3">
          <EditableText stepId={moduleId} fieldKey="subtitle" defaultText={content.subtitle} multiline />
        </p>
      </div>

      {/* 4-STEP INTERACTIVE STEPPER NAV BAR */}
      <div className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl border border-white/90 shadow-sm grid grid-cols-4 gap-1 text-[11px] font-bold text-center">
        <button
          onClick={() => setCurrentStep(1)}
          className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${currentStep === 1 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'}`}
        >
          <span>🎥 Step 1</span>
          <span className="text-[9px] opacity-80 font-normal">Video</span>
        </button>

        <button
          onClick={() => setCurrentStep(2)}
          className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${currentStep === 2 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'}`}
        >
          <span>🖼️ Step 2</span>
          <span className="text-[9px] opacity-80 font-normal">Infographic</span>
        </button>

        <button
          onClick={() => setCurrentStep(3)}
          className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${currentStep === 3 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'}`}
        >
          <span>🎮 Step 3</span>
          <span className="text-[9px] opacity-80 font-normal">Mini-Game</span>
        </button>

        <button
          onClick={() => setCurrentStep(4)}
          className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${currentStep === 4 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'}`}
        >
          <span>📝 Step 4</span>
          <span className="text-[9px] opacity-80 font-normal">Quiz 10 ข้อ</span>
        </button>
      </div>

      {/* STEP CONTENT SWITCHER */}
      <div className="min-h-[360px]">
        {/* STEP 1: Video First + 3 Bullet Takeaways */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <VideoPlayer video={content.video} />

            {/* 3 Bullet Key Takeaways Box */}
            {content.video?.keyTakeaways && (
              <div className="bg-white/90 backdrop-blur-xl rounded-[28px] p-4 border border-indigo-100 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Bookmark className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-extrabold text-slate-900">3 Bullet-Point Key Takeaways (สรุปประเด็นสำคัญ)</h4>
                </div>
                <div className="space-y-2 text-xs font-semibold text-slate-800">
                  {content.video.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100/80 leading-relaxed">
                      {takeaway}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Infographic Carousel */}
        {currentStep === 2 && (
          <div className="animate-in fade-in duration-300">
            {content.infographics?.map((info) => (
              <InfographicCard key={info.id} infographic={info} />
            ))}
          </div>
        )}

        {/* STEP 3: Mini-Game */}
        {currentStep === 3 && (
          <div className="animate-in fade-in duration-300">
            {renderMiniGame()}
          </div>
        )}

        {/* STEP 4: Module Quiz (10 Questions per Module - 1 Q per screen) */}
        {currentStep === 4 && (
          <div className="bg-white/90 backdrop-blur-xl rounded-[28px] p-5 border border-white/90 shadow-xl text-slate-900 animate-in fade-in duration-300">
            {!quizFinished ? (
              <div>
                {/* Quiz Header */}
                <div className="flex items-center justify-between border-b border-indigo-100 pb-3 mb-4 text-xs">
                  <span className="font-extrabold text-indigo-700 flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" /> แบบทดสอบประจำโมดูล (10 ข้อ)
                  </span>
                  <span className="font-mono text-slate-700 font-bold bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
                    ข้อ {quizIdx + 1}/10
                  </span>
                </div>

                {/* 1 Question Per Screen Layout */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-4 bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100 leading-relaxed">
                  {currentQuizQ?.question}
                </h3>

                {/* Options */}
                <div className="space-y-2 mb-5">
                  {currentQuizQ?.options.map((opt, idx) => {
                    let optStyle = "bg-white border-indigo-100 hover:border-indigo-300 text-slate-700 shadow-sm";

                    if (selectedOpt === idx) {
                      optStyle = "bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-1 ring-indigo-500 shadow-sm";
                    }

                    if (isAnswered) {
                      if (idx === currentQuizQ.correctAnswer) {
                        optStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                      } else if (selectedOpt === idx && selectedOpt !== currentQuizQ.correctAnswer) {
                        optStyle = "bg-rose-50 border-rose-500 text-rose-900";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectQuizOpt(idx)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
                      >
                        <span className="flex-1 pr-2">{opt}</span>
                        {isAnswered && idx === currentQuizQ.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Answer Explanation */}
                {isAnswered && (
                  <div className={`p-3.5 rounded-2xl border mb-4 text-xs ${selectedOpt === currentQuizQ.correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
                    <div className="font-bold mb-1">
                      {selectedOpt === currentQuizQ.correctAnswer ? '✓ ถูกต้อง! คำอธิบาย:' : '✗ ยังไม่ถูกต้อง! คำอธิบาย:'}
                    </div>
                    <p className="text-[11px] leading-relaxed">{currentQuizQ.explanation}</p>
                  </div>
                )}

                {/* Quiz Navigation Action */}
                <div className="flex justify-end pt-1">
                  {!isAnswered ? (
                    <button
                      disabled={selectedOpt === null}
                      onClick={handleConfirmQuizAnswer}
                      className="px-6 py-3 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-white rounded-full text-xs font-extrabold transition-all shadow-md"
                    >
                      ยืนยันคำตอบ
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuizQ}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                    >
                      {quizIdx < quizQuestions.length - 1 ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน & รับ Badge'} <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Score Summary & Reward Badge View */
              <div className="text-center py-5">
                <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-200 shadow-md">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 mb-1">ผ่านการสอบประจำโมดูล!</h4>
                <span className="inline-block bg-amber-100 text-amber-800 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-200 mb-4">
                  {content.badgeName || '🎖️ UNESCO Module Competency Badge'}
                </span>

                <div className="block bg-indigo-50 max-w-xs mx-auto px-6 py-3 rounded-2xl border border-indigo-100 mb-5">
                  <span className="text-3xl font-extrabold text-indigo-700 font-mono block">
                    {quizScore} / 10
                  </span>
                  <span className="text-xs text-slate-600">คะแนนที่ได้ ({Math.round((quizScore / 10) * 100)}%)</span>
                </div>

                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white font-extrabold rounded-full text-xs shadow-md"
                >
                  ทำแบบทดสอบใหม่อีกครั้ง
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="flex justify-between items-center pt-2">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          className="px-4 py-2.5 rounded-full bg-white border border-indigo-100 text-slate-700 text-xs font-bold disabled:opacity-30 shadow-sm flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> ขั้นตอนก่อนหน้า
        </button>

        <button
          disabled={currentStep === 4}
          onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
          className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold disabled:opacity-30 shadow-md shadow-indigo-600/30 flex items-center gap-1"
        >
          <span>ขั้นตอนถัดไป</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
