import React, { useState, useEffect } from 'react';
import { Edit2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EditableText = ({
  stepId,
  fieldKey,
  defaultText,
  className = '',
  multiline = false,
  as: Component = 'span'
}) => {
  const { editableContent, updateEditableText, currentMode, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Get live synced value from context or fallback to default
  const value = editableContent[stepId]?.[fieldKey] !== undefined
    ? editableContent[stepId][fieldKey]
    : defaultText;

  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    if (tempValue.trim() !== value) {
      updateEditableText(stepId, fieldKey, tempValue);
      showToast(`อัปเดตข้อความ "${fieldKey}" เรียบร้อยแล้ว (Live Sync)`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue(value);
    }
  };

  if (isEditing) {
    return (
      <div className="inline-flex items-center gap-1.5 w-full my-1 z-30 relative">
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            rows={3}
            className="w-full text-xs p-2 rounded-xl border-2 border-indigo-600 bg-white text-slate-900 shadow-xl focus:outline-none ring-2 ring-indigo-500/30"
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full text-xs px-2.5 py-1.5 rounded-xl border-2 border-indigo-600 bg-white text-slate-900 shadow-xl focus:outline-none ring-2 ring-indigo-500/30 font-bold"
          />
        )}
        <button
          onClick={handleSave}
          className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow flex-shrink-0"
          title="บันทึกข้อความ"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <Component
      onDoubleClick={() => setIsEditing(true)}
      className={`${className} cursor-pointer group/edit relative inline-block transition-all hover:text-indigo-600 hover:underline hover:decoration-dashed hover:decoration-indigo-400`}
      title="ดับเบิลคลิกเพื่อแก้ไขข้อความ (Inline Live Editing)"
    >
      {value}
      <span className="opacity-0 group-hover/edit:opacity-100 transition-opacity inline-ml-1 text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-md font-sans font-bold shadow-md ml-1 align-middle pointer-events-none">
        ✏️ แก้ไข
      </span>
    </Component>
  );
};
