import React, { useEffect } from 'react';
import { Award, X, Download, Printer, CheckCircle, QrCode, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const CertificateModal = () => {
  const { teacherName, schoolName, postTestScore, showCertificateModal, setShowCertificateModal, showToast } = useApp();

  useEffect(() => {
    if (showCertificateModal) {
      // Trigger Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [showCertificateModal]);

  if (!showCertificateModal) return null;

  const todayStr = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 text-white shadow-2xl relative my-8 animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={() => setShowCertificateModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Certificate Frame */}
        <div className="border-4 border-double border-amber-400/60 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/20 text-center relative overflow-hidden">
          {/* Watermark / Badge Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-amber-300" />
          </div>

          {/* Certificate Header */}
          <div className="flex justify-center items-center gap-2 mb-2">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">UNESCO ICT Competency Framework</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-amber-200 mb-1">
            ใบรับรองสมรรถนะครูดิจิทัล (Digital Citizenship Certificate)
          </h2>
          <p className="text-xs text-slate-300 mb-6">
            โครงการพัฒนาการออกแบบการอบรมครูเรื่อง Digital Citizenship (M-Training Framework)
          </p>

          <p className="text-xs text-slate-400">ขอมอบใบรับรองฉบับนี้เพื่อแสดงว่า</p>

          {/* Recipient Name */}
          <div className="my-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-serif text-amber-100">
              {teacherName}
            </h3>
            <p className="text-xs text-amber-300/80 mt-1">{schoolName}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
            ได้ผ่านการประเมินสมรรถนะหลัก 4 ด้าน ด้านความปลอดภัย กฎหมาย PDPA สุขภาวะ นวัตกรรมการสอน และการเป็นพลเมืองดิจิทัลต้นแบบ ตามเกณฑ์ความรู้ Mosher & Gottfredson Level 2 & 3
          </p>

          {/* Badge & Scores Info */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Post-Test Score</span>
              <span className="text-lg font-bold text-amber-400 font-mono">{postTestScore || 100}%</span>
            </div>
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Competency Level</span>
              <span className="text-xs font-bold text-emerald-400">UNESCO Mastered</span>
            </div>
          </div>

          {/* Footer Signatures & QR */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-500/20 text-xs">
            <div className="text-left text-slate-400 text-[11px]">
              <p>วันที่อนุมัติ: {todayStr}</p>
              <p className="font-mono text-amber-400/80 text-[10px]">VERIFY ID: UNESCO-M-2026-89412</p>
            </div>

            {/* QR Mockup */}
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
              <QrCode className="w-8 h-8 text-slate-300" />
              <div className="text-[9px] text-left text-slate-400">
                <span className="block font-bold text-slate-200">Scan to Verify</span>
                <span>UNESCO Competency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={() => showToast('สั่งพิมพ์ใบรับรองเรียบร้อยแล้ว')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> พิมพ์ใบรับรอง
          </button>
          <button
            onClick={() => showToast('ดาวน์โหลดไฟล์ PDF ใบรับรองเรียบร้อยแล้ว')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" /> ดาวน์โหลด PDF
          </button>
        </div>
      </div>
    </div>
  );
};
