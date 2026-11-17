'use client';

import React from 'react';
import { Heart, HeartCrack, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function ProgressBar({
  score = 50,
  isMuted = false,
  onToggleMute = () => {},
  currentScene = 0,
  totalScenes = 3,
}) {
  const clampedScore = Math.max(0, Math.min(100, score));

  return (
    <header className="w-full sticky top-0 z-30 px-4 py-3 sm:py-4">
      <div className="max-w-4xl lg:max-w-5xl mx-auto backdrop-blur-xl bg-white/75 rounded-2xl border border-white/80 shadow-lg shadow-rose-950/5 px-4 sm:px-6 py-3 transition-all">
        {/* Top bar info */}
        <div className="flex items-center justify-between mb-2">
          {/* Title & Heart */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              {clampedScore <= 15 ? (
                <HeartCrack className="w-5 h-5 text-rose-800 animate-pulse" />
              ) : (
                <Heart
                  className={`w-5 h-5 text-rose-900 fill-rose-900 transition-transform ${
                    clampedScore >= 80 ? 'animate-bounce' : 'animate-pulse'
                  }`}
                />
              )}
              {clampedScore >= 80 && (
                <Sparkles className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-rose-950 text-sm tracking-tight leading-none">
                Akzeinep&apos;s Mood
              </span>
              <span className="text-[10px] text-rose-900/60 font-medium">
                {clampedScore >= 80
                  ? 'В восторге ✨'
                  : clampedScore >= 50
                  ? 'Смягчилась 🌸'
                  : 'Опасная зона ⚡'}
              </span>
            </div>
          </div>

          {/* Right info */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-rose-900 border border-blue-100/80">
              {Math.min(currentScene + 1, totalScenes)}/{totalScenes}
            </span>

            <button
              onClick={onToggleMute}
              className="p-1 rounded-full text-rose-900/60 hover:text-rose-950 hover:bg-rose-50 transition-colors cursor-pointer"
              title={isMuted ? 'Включить звук' : 'Выключить звук'}
              aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress track */}
        <div className="relative h-3 w-full bg-yellow-50/80 rounded-full border border-rose-900/15 overflow-hidden shadow-inner p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-800 via-rose-900 to-[#4c0519] transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${clampedScore}%` }}
          />
        </div>

        {/* Score values */}
        <div className="flex justify-between items-center mt-1 text-[11px] text-rose-950/70 font-medium px-0.5">
          <span>0%</span>
          <span className="font-bold text-rose-950">{clampedScore}%</span>
          <span>100%</span>
        </div>
      </div>
    </header>
  );
}
