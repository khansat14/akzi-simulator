'use client';

import React from 'react';
import Image from 'next/image';

export default function SceneCard({ currentScene = 0, scene, children }) {
  if (!scene) return null;

  // Strict Image Mapping:
  // Scene 0: /scene1.jpg
  // Scene 1: /scene2.jpg
  // Scene 2: /scene3.jpg
  const imageSrc =
    currentScene === 0
      ? '/scene1.jpg'
      : currentScene === 1
      ? '/scene2.jpg'
      : '/scene3.jpg';

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-10 items-center">
      {/* Left Column: Photo of Akzeinep (Sleek, Uncropped) */}
      <div className="w-full flex justify-center items-center">
        <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-none aspect-square rounded-3xl overflow-hidden shadow-xl shadow-rose-950/10 border border-white/80 bg-white/70 backdrop-blur-xl group">
          <Image
            src={imageSrc}
            alt={`Сцена ${currentScene + 1}: ${scene.title}`}
            fill
            priority
            sizes="(max-width: 768px) 360px, 480px"
            className="object-contain w-full h-full rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Glass title badge */}
          <div className="absolute top-3 left-3 backdrop-blur-md bg-white/85 text-rose-950 border border-white/90 text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            {scene.title}
          </div>
        </div>
      </div>

      {/* Right Column: Context text and Dialogue options */}
      <div className="w-full flex flex-col justify-center gap-4 sm:gap-5">
        {/* Context Card */}
        <div className="backdrop-blur-xl bg-white/80 rounded-2xl border border-white/80 p-4 sm:p-5 shadow-lg shadow-rose-950/5">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-rose-900/70">
            <span className="w-2 h-2 rounded-full bg-rose-700 animate-pulse" />
            <span>Обстановка</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
            {scene.context}
          </p>
        </div>

        {/* Dialogue options (iMessage bubbles) */}
        {children}
      </div>
    </div>
  );
}
