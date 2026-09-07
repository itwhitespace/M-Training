import React from 'react';
import { FileText, Download, FolderGit2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExternalResources = ({ resources }) => {
  const { showToast } = useApp();

  if (!resources || resources.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-4 border border-white/90 shadow-lg shadow-indigo-500/5 mb-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="p-2 rounded-2xl bg-teal-100 text-teal-700 font-bold">
          <FolderGit2 className="w-4 h-4" />
        </span>
        <div>
          <h4 className="text-sm font-bold text-slate-900">External Resources & Docs</h4>
          <span className="text-[11px] text-slate-500">คลังเอกสารและลิงก์ความรู้เพิ่มเติม</span>
        </div>
      </div>

      <div className="space-y-2">
        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100/80 flex items-center justify-between gap-2 hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-white text-indigo-600 border border-indigo-100 flex-shrink-0 shadow-sm">
                <FileText className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-slate-900 block truncate">{res.title}</span>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="bg-indigo-100 px-1.5 py-0.5 rounded font-mono font-bold text-indigo-700">{res.format}</span>
                  <span>{res.size}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast(`กำลังดาวน์โหลดเอกสาร: "${res.title}"`)}
              className="px-3.5 py-1.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{res.linkText}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
