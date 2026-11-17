'use client';

import React from 'react';
import Image from 'next/image';
import { GAME_OVER_MESSAGE } from '../lib/gameData';
import { HeartCrack, RotateCcw } from 'lucide-react';

export default function GameOverScreen({ onRestart = () => {} }) {
  return (
    <div className="w-full max-w-4xl mx-auto backdrop-blur-xl bg-white/85 rounded-3xl shadow-2xl shadow-rose-950/10 border border-white/90 p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center text-center md:text-left animate-pop-in">
      {/* Left Column: /scene1.jpg (Aspect-square, uncropped, grayscale) */}
      <div className="w-full flex justify-center items-center">
        <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-none aspect-square rounded-2xl overflow-hidden shadow-md border border-slate-300 bg-slate-100">
          <Image
            src="/scene1.jpg"
            alt="Game Over"
            fill
            priority
            sizes="(max-width: 768px) 360px, 440px"
            className="object-contain w-full h-full rounded-2xl grayscale contrast-110"
          />

          <div className="absolute top-3 right-3 backdrop-blur-md bg-slate-900/80 text-rose-200 border border-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
            <HeartCrack className="w-3.5 h-3.5 text-rose-400" />
            <span>0% Настроение</span>
          </div>
        </div>
      </div>

      {/* Right Column: Game Over Message & Action */}
      <div className="flex flex-col gap-5 justify-center">
        {/* Game Over Message Card */}
        <div className="backdrop-blur-md bg-gradient-to-r from-slate-100 via-rose-50/70 to-slate-100 rounded-2xl border border-rose-900/15 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs uppercase tracking-wider font-bold text-rose-950 mb-2">
            <HeartCrack className="w-4 h-4 text-rose-800" />
            <span>Game Over</span>
            <HeartCrack className="w-4 h-4 text-rose-800" />
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
            {GAME_OVER_MESSAGE}
          </p>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-900 via-rose-800 to-[#500618] hover:from-[#6c0b25] hover:to-[#380310] text-yellow-100 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border border-rose-700/60"
        >
          <RotateCcw className="w-4 h-4 text-yellow-300" />
          <span>Попробовать снова 🥺</span>
        </button>
      </div>
    </div>
  );
}
