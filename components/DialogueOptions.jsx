'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function DialogueOptions({
  options = [],
  onSelectOption = () => {},
  disabled = false,
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Prompt label */}
      <div className="flex items-center justify-between px-1 text-xs text-rose-950/70 font-medium">
        <span>Твой ответ (Али):</span>
        <span className="text-[11px] text-slate-400">Нажми, чтобы отправить</span>
      </div>

      {/* iMessage-styled bubbles container */}
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => (
          <div key={opt.id} className="flex flex-col items-end w-full group">
            {/* iOS Subtitle / Variant badge */}
            <span className="text-[10px] uppercase tracking-wider text-rose-900/60 font-semibold mr-3 mb-0.5 select-none">
              Вариант {opt.label}
            </span>

            {/* iMessage Bubble Button */}
            <button
              onClick={() => !disabled && onSelectOption(opt)}
              disabled={disabled}
              className={`relative w-full sm:max-w-[92%] text-left px-4 py-3 sm:px-5 sm:py-3.5 rounded-[22px] rounded-br-[6px] shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-between gap-3 ${
                disabled
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 text-slate-600'
                  : 'bg-gradient-to-r from-rose-900 via-rose-800 to-[#500618] text-white hover:from-[#6c0b25] hover:to-[#3b0311] hover:shadow-md hover:shadow-rose-950/15 border border-rose-700/40'
              }`}
            >
              <span className="text-xs sm:text-sm font-medium leading-relaxed drop-shadow-2xs">
                {opt.text}
              </span>

              <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                <Send className="w-3 h-3 text-yellow-200 transform group-hover:translate-x-0.5 -translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
