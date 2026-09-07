import React from 'react';
import { ShieldCheck, Award, FileCheck, School } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileView = () => {
  const { teacherName, schoolName, completedModules, isCertificateIssued, setShowCertificateModal, postTestScore } = useApp();

  return (
    <div className="p-4 text-slate-900 space-y-4">
      {/* Teacher Profile Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-5 border border-white/90 shadow-lg shadow-indigo-500/5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md flex-shrink-0">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-indigo-700 text-xl">
            {teacherName ? teacherName.charAt(0) : 'T'}
          </div>
        </div>
        <div className="min-w-0">
          <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200 inline-flex items-center gap-1 mb-1">
            <ShieldCheck className="w-3 h-3" /> ครูต้นแบบ UNESCO
          </span>
          <h2 className="text-base font-extrabold text-slate-900 truncate">{teacherName}</h2>
          <p className="text-xs text-slate-500 flex items-center gap-1 truncate mt-0.5">
            <School className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" /> {schoolName}
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-4 border border-white/90 shadow-lg shadow-indigo-500/5 space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          บันทึกความก้าวหน้าการเรียน (3 สัปดาห์)
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100 text-center">
            <span className="text-[10px] text-slate-500 block font-semibold">โมดูลที่เรียนผ่าน</span>
            <span className="text-2xl font-extrabold text-indigo-700 font-mono">
              {completedModules.length} / 4
            </span>
          </div>
          <div className="bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100 text-center">
            <span className="text-[10px] text-slate-500 block font-semibold">คะแนน Post-Test</span>
            <span className="text-2xl font-extrabold text-amber-600 font-mono">
              {postTestScore !== null ? `${postTestScore}%` : 'ยังไม่ได้ทำ'}
            </span>
          </div>
        </div>
      </div>

      {/* Certificate Vault */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-4 border border-white/90 shadow-lg shadow-indigo-500/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">คลังใบรับรอง (Certificate Vault)</h3>
          </div>
        </div>

        {isCertificateIssued ? (
          <div className="bg-gradient-to-r from-amber-50 to-indigo-50 p-3.5 rounded-2xl border border-amber-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">UNESCO Digital Citizenship Certificate</span>
              <span className="text-[10px] text-slate-600">อนุมัติระดับความรู้ Mosher Level 2 & 3</span>
            </div>
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-xs flex items-center gap-1 shadow-md shadow-indigo-500/20"
            >
              <FileCheck className="w-3.5 h-3.5" /> ดูใบรับรอง
            </button>
          </div>
        ) : (
          <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 text-center text-xs text-slate-500 font-medium">
            ยังไม่ออกใบรับรอง (ต้องสอบผ่าน Post-test ในหน้า 6 ด้วยคะแนนอย่างน้อย 80%)
          </div>
        )}
      </div>
    </div>
  );
};
