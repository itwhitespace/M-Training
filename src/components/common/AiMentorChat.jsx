import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, Bot, ShieldCheck, User } from 'lucide-react';

export const AiMentorChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'สวัสดีครับครู! ผมคือ "ครูเอไอ" ผู้ช่วยสมรรถนะดิจิทัลตามกรอบ UNESCO ยินดีให้คำปรึกษาด้าน PDPA, สุขภาวะครู, นวัตกรรม AI และจริยธรรมดิจิทัลครับ มีเรื่องใดอยากสอบถามเป็นพิเศษไหมครับ?'
    }
  ]);

  const presetQuestions = [
    'PDPA ในห้องเรียนต้องเริ่มต้นอย่างไร?',
    'ป้องกัน Teacher Burnout จากแชตกลุ่มอย่างไร?',
    'ใช้ AI ช่วยเขียนแผนการสอนอย่างไร?',
    'วิธีรับมือ Cyberbullying ในโรงเรียน?'
  ];

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');

    // Simulated Instant AI Response
    setTimeout(() => {
      let replyText = 'ขอบคุณสำหรับคำถามครับ! ตามกรอบสมรรถนะ UNESCO ครูสามารถประยุกต์ใช้แนวทาง Micro-learning และการสร้างกติการ่วมกันเพื่อแก้ไขปัญหานี้ได้อย่างมีประสิทธิภาพครับ';

      if (query.includes('PDPA')) {
        replyText = '📌 การเริ่มต้น PDPA ในชั้นเรียน: 1) ขอ Consent ผู้ปกครองในการเผยแพร่ภาพเด็ก 2) ปิดระบุพิกัดสถานที่ Geotagging 3) เบลอใบหน้าและป้ายชื่อเด็กหากนำภาพไปสื่อสารสาธารณะครับ';
      } else if (query.includes('Burnout') || query.includes('แชต')) {
        replyText = '🌱 การป้องกัน Burnout: กำหนดช่วงเวลาปิดรับข้อความงาน (เช่น หลัง 19.00 น.) สื่อสารข้อตกลงกับผู้ปกครองอย่างสุภาพตั้งแต่เปิดเทอม และจัดพื้นที่ No-Tech Zone ในบ้านครับ';
      } else if (query.includes('AI') || query.includes('แผนการสอน')) {
        replyText = '🚀 การใช้ AI ช่วยเขียนแผน: ใช้ AI เป็น Co-pilot ร่างเค้าโครงแผนการสอนและไอเดียกิจกรรม Active Learning โดยครูเป็นผู้ทำ Fact-checking ตรวจสอบความถูกต้องก่อนนำไปใช้ครับ';
      } else if (query.includes('Cyberbullying') || query.includes('บูลลี่')) {
        replyText = '🌐 การรับมือ Cyberbullying: ปลูกฝัง Empathy ความเห็นอกเห็นใจ ชะลอการแชร์ข่าวสารที่ไม่ได้รับการยืนยัน และสร้างกติกาพื้นที่เรียนรู้ออนไลน์ที่ปลอดภัยร่วมกันครับ';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: replyText }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Glassmorphic Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full iridescent-sphere flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform border border-white/80 group"
        title="สอบถามครูเอไอ ผู้ช่วยดิจิทัล"
      >
        <Sparkles className="w-7 h-7 animate-pulse" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
      </button>

      {/* AI Chat Modal Popup */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-24 sm:right-6 sm:left-auto sm:w-96 z-50 bg-white/90 backdrop-blur-2xl border border-white/90 rounded-[32px] shadow-2xl flex flex-col h-[520px] overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold flex items-center gap-1">
                  ครูเอไอ ผู้ช่วยดิจิทัล <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <span className="text-[10px] opacity-90 block">UNESCO ICT Competency Assistant</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-indigo-50/40 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${m.sender === 'user' ? 'bg-indigo-600 text-white font-bold rounded-tr-none shadow-md' : 'bg-white text-slate-800 border border-indigo-100 shadow-sm rounded-tl-none font-medium'}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Preset Questions Chips */}
          <div className="px-3 py-2 bg-white/80 border-t border-indigo-100/80 flex gap-1.5 overflow-x-auto no-scrollbar">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] whitespace-nowrap border border-indigo-200/60 transition-colors"
              >
                💡 {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-indigo-100 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="พิมพ์คำถามข้อสงสัย..."
              className="flex-1 text-xs px-3.5 py-2 rounded-full border border-indigo-200 bg-indigo-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
