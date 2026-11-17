'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function DialogueOptions({
  options = [],
  onSelectOption = () => {},
  disabled = false,
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      {/* Header prompt */}
      <div className="flex items-center justify-between px-1 text-xs text-rose-950/70 font-medium">
        <span>Твой ответ (Али):</span>
        <span className="text-[11px] text-slate-400">Выбери реплику</span>
      </div>

      {/* 3 iMessage chat bubbles */}
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <div key={opt.id} className="flex flex-col items-end w-full group">
            {/* iOS Subtitle / Variant badge */}
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-rose-900/60 font-semibold mr-3 mb-0.5 select-none">
              Вариант {opt.label}
            </span>

            {/* iMessage Bubble Button */}
            <button
              onClick={() => !disabled && onSelectOption(opt)}
              disabled={disabled}
              className={`relative w-full sm:max-w-[94%] text-left px-3.5 py-2.5 sm:px-4.5 sm:py-3 rounded-[20px] rounded-br-[5px] shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-between gap-3 ${
                disabled
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 text-slate-600'
                  : 'bg-gradient-to-r from-rose-900 via-rose-800 to-[#500618] text-white hover:from-[#6c0b25] hover:to-[#3b0311] hover:shadow-md hover:shadow-rose-950/15 border border-rose-700/40'
              }`}
            >
              <span className="text-xs sm:text-[13px] md:text-sm font-medium leading-snug drop-shadow-2xs">
                {opt.text}
              </span>

              <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                <Send className="w-2.5 h-2.5 text-yellow-200 transform group-hover:translate-x-0.5 -translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
