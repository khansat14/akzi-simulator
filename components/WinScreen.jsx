'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { WIN_MESSAGE } from '../lib/gameData';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

export default function WinScreen({ score = 100, onRestart = () => {} }) {
  useEffect(() => {
    try {
      const colors = ['#881337', '#e11d48', '#fbbf24', '#fde047', '#38bdf8', '#f43f5e'];
      const end = Date.now() + 2 * 1000;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    } catch {
      // Ignore if canvas is unavailable
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto backdrop-blur-xl bg-white/85 rounded-3xl shadow-2xl shadow-rose-950/10 border border-white/90 p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center text-center md:text-left animate-pop-in">
      {/* Left Column: /scene3.jpg (Aspect-square, uncropped) */}
      <div className="w-full flex justify-center items-center">
        <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-none aspect-square rounded-2xl overflow-hidden shadow-md border border-rose-900/10 bg-yellow-50/50">
          <Image
            src="/scene3.jpg"
            alt="Акзейнеп счастлива"
            fill
            priority
            sizes="(max-width: 768px) 360px, 440px"
            className="object-contain w-full h-full rounded-2xl"
          />

          <div className="absolute top-3 right-3 backdrop-blur-md bg-rose-900/80 text-yellow-100 border border-rose-700/60 text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-yellow-200 text-yellow-200" />
            <span>{score}% Настроение</span>
          </div>
        </div>
      </div>

      {/* Right Column: Victory Message & Action */}
      <div className="flex flex-col gap-5 justify-center">
        {/* Romantic Message Card */}
        <div className="backdrop-blur-md bg-gradient-to-r from-blue-50/70 via-yellow-50/80 to-rose-50/60 rounded-2xl border border-rose-900/15 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs uppercase tracking-wider font-bold text-rose-900 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Счастливый финал</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-base sm:text-lg font-bold text-rose-950 leading-relaxed">
            «{WIN_MESSAGE}»
          </p>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-900 via-rose-800 to-[#500618] hover:from-[#6c0b25] hover:to-[#380310] text-yellow-100 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] border border-rose-700/60"
        >
          <RotateCcw className="w-4 h-4 text-yellow-300" />
          <span>Сыграть ещё раз 💖</span>
        </button>
      </div>
    </div>
  );
}
