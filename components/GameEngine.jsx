'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GAME_SCENES } from '../lib/gameData';
import { soundManager } from '../lib/audio';
import ProgressBar from './ProgressBar';
import SceneCard from './SceneCard';
import DialogueOptions from './DialogueOptions';
import TypingIndicator from './TypingIndicator';
import WinScreen from './WinScreen';
import GameOverScreen from './GameOverScreen';

export default function GameEngine() {
  const [moodScore, setMoodScore] = useState(40);
  const [currentScene, setCurrentScene] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'won' | 'lost'
  const [isTyping, setIsTyping] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTimerRef = useRef(null);

  // Clean 1.5s typing delay without synchronous setState in effect
  useEffect(() => {
    if (!isTyping || gameState !== 'playing') return;

    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isTyping, currentScene, gameState]);

  // Cleanup transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playClick();
    }
  };

  const handleSelectOption = (option) => {
    if (isTransitioning || isTyping) return;
    soundManager.init();

    // Cap mood score between 0 and 100
    const newScore = Math.max(0, Math.min(100, moodScore + option.score));
    setMoodScore(newScore);

    // Audio feedback based on score delta
    if (option.score > 0) {
      soundManager.playPositive();
    } else if (option.score < 0) {
      soundManager.playNegative();
    } else {
      soundManager.playClick();
    }

    setIsTransitioning(true);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = setTimeout(() => {
      // Rule 1: If moodScore <= 0 at ANY point -> Trigger Game Over screen immediately
      if (newScore <= 0) {
        setGameState('lost');
        soundManager.playGameOver();
        setIsTransitioning(false);
        return;
      }

      // Rule 2: Do NOT trigger Win early by reaching 100.
      // Progress through all 6 scenes (indexes 0 to 5).
      if (currentScene < GAME_SCENES.length - 1) {
        setCurrentScene((prev) => prev + 1);
        setIsTyping(true);
        setIsTransitioning(false);
      } else {
        // Rule 3: Player completes Scene 5 (index 5) and moodScore > 0 -> Trigger Win screen!
        setGameState('won');
        soundManager.playWin();
        setIsTransitioning(false);
      }
    }, 280);
  };

  const handleRestart = () => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }
    soundManager.playClick();
    setMoodScore(40);
    setCurrentScene(0);
    setGameState('playing');
    setIsTyping(true);
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
      <main className="flex-1 w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-6 flex flex-col justify-center items-center">
        {gameState === 'playing' && currentSceneData && (
          <div className="w-full animate-pop-in">
            {/* Two-column scene container (Left: Photo, Right: Context + Options/Typing) */}
            <SceneCard currentScene={currentScene} scene={currentSceneData}>
              {isTyping ? (
                <TypingIndicator />
              ) : (
                <div className="animate-pop-in">
                  <DialogueOptions
                    options={currentSceneData.options}
                    onSelectOption={handleSelectOption}
                    disabled={isTransitioning}
                  />
                </div>
              )}
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
      <footer className="w-full py-2.5 px-4 text-center text-[11px] text-rose-950/60 border-t border-rose-900/10 backdrop-blur-xs">
        <p>akzi-simulator • Для Акзейнеп от Али 💖 • 6 февраля</p>
      </footer>
    </div>
  );
}
