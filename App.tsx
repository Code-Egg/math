import React, { useState } from 'react';
import { GameMode, GameState, GameStats } from './types';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { EndScreen } from './components/EndScreen';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.NINE_X_NINE);
  const [lastStats, setLastStats] = useState<GameStats | null>(null);

  const handleStartGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameState(GameState.PLAYING);
  };

  const handleGameFinish = (stats: GameStats) => {
    setLastStats(stats);
    setGameState(GameState.FINISHED);
  };

  const handleRestart = () => {
    setGameState(GameState.PLAYING);
  };

  const handleHome = () => {
    setGameState(GameState.MENU);
  };

  return (
    <div className="w-full h-full">
      {gameState === GameState.MENU && (
        <StartScreen onStart={handleStartGame} />
      )}
      
      {gameState === GameState.PLAYING && (
        <GameScreen 
          mode={gameMode} 
          onFinish={handleGameFinish} 
          onBack={handleHome} 
        />
      )}
      
      {gameState === GameState.FINISHED && lastStats && (
        <EndScreen 
          stats={lastStats} 
          onRestart={handleRestart} 
          onHome={handleHome} 
        />
      )}
    </div>
  );
}