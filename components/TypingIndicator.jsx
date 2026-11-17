'use client';

import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="w-full flex flex-col gap-2 py-2 animate-pop-in">
      {/* Small status header */}
      <div className="flex items-center gap-1.5 px-1 text-xs text-rose-900/70 font-medium">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-700" />
        </span>
        <span>Акзейнеп печатает...</span>
      </div>

      {/* Sleek iMessage Typing Bubble */}
      <div className="self-start inline-flex items-center gap-1.5 px-4 py-3 rounded-[20px] rounded-bl-[4px] bg-white/85 backdrop-blur-md border border-white/80 shadow-sm shadow-rose-950/5">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-900/60 animate-bounce [animation-delay:-0.32s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-rose-900/60 animate-bounce [animation-delay:-0.16s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-rose-900/60 animate-bounce" />
      </div>
    </div>
  );
}
