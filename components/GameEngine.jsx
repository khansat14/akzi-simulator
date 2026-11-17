'use client';

import React, { useState } from 'react';
import { GAME_SCENES } from '../lib/gameData';
import { soundManager } from '../lib/audio';
import ProgressBar from './ProgressBar';
import SceneCard from './SceneCard';
import DialogueOptions from './DialogueOptions';
import WinScreen from './WinScreen';
import GameOverScreen from './GameOverScreen';

export default function GameEngine() {
  const [moodScore, setMoodScore] = useState(50);
  const [currentScene, setCurrentScene] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'won' | 'lost'
  const [isMuted, setIsMuted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playClick();
    }
  };

  const handleSelectOption = (option) => {
    if (isTransitioning) return;
    soundManager.init();

    const newScore = Math.max(0, Math.min(100, moodScore + option.score));
    setMoodScore(newScore);

    if (option.score > 0) {
      soundManager.playPositive();
    } else {
      soundManager.playNegative();
    }

    setIsTransitioning(true);

    setTimeout(() => {
      // 1. Win Condition
      if (newScore >= 100) {
        setGameState('won');
        soundManager.playWin();
        setIsTransitioning(false);
        return;
      }

      // 2. Game Over Condition (Score hit 0)
      if (newScore <= 0) {
        setGameState('lost');
        soundManager.playGameOver();
        setIsTransitioning(false);
        return;
      }

      // 3. Move to next scene if available
      if (currentScene < GAME_SCENES.length - 1) {
        setCurrentScene((prev) => prev + 1);
        setIsTransitioning(false);
      } else {
        // Final scene reached without 100% -> Game Over (Sent to the couch)
        setGameState('lost');
        soundManager.playGameOver();
        setIsTransitioning(false);
      }
    }, 280);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setMoodScore(50);
    setCurrentScene(0);
    setGameState('playing');
    setIsTransitioning(false);
  };

  const currentSceneData = GAME_SCENES[currentScene];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-yellow-50 to-rose-50/50 text-slate-900 selection:bg-rose-200 selection:text-rose-950 font-sans">
      {/* Top Bar: Akzeinep's Mood */}
      <ProgressBar
        score={moodScore}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        currentScene={currentScene}
        totalScenes={GAME_SCENES.length}
      />

      {/* Main Game Stage */}
      <main className="flex-1 w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex flex-col justify-center items-center">
        {gameState === 'playing' && currentSceneData && (
          <div className="w-full animate-pop-in">
            {/* Two-column on desktop (Left: photo, Right: context + dialogue) */}
            <SceneCard currentScene={currentScene} scene={currentSceneData}>
              <DialogueOptions
                options={currentSceneData.options}
                onSelectOption={handleSelectOption}
                disabled={isTransitioning}
              />
            </SceneCard>
          </div>
        )}

        {/* Win Screen */}
        {gameState === 'won' && (
          <div className="w-full flex justify-center animate-pop-in">
            <WinScreen score={moodScore} onRestart={handleRestart} />
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'lost' && (
          <div className="w-full flex justify-center animate-pop-in">
            <GameOverScreen onRestart={handleRestart} />
          </div>
        )}
      </main>

      {/* Sleek Minimal Footer */}
      <footer className="w-full py-3 px-4 text-center text-[11px] text-rose-950/60 border-t border-rose-900/10 backdrop-blur-xs">
        <p>akzi-simulator • Для Акзейнеп от Али 💖</p>
      </footer>
    </div>
  );
}
