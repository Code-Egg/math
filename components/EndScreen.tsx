import React from 'react';
import { GameStats } from '../types';
import { Button } from './Button';

interface EndScreenProps {
  stats: GameStats;
  onRestart: () => void;
  onHome: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ stats, onRestart, onHome }) => {
  const percentage = Math.round((stats.correct / stats.total) * 100);
  
  let message = "";
  let emoji = "";
  
  if (percentage === 100) {
    message = "MISSION PERFECT!";
    emoji = "🏆";
  } else if (percentage >= 80) {
    message = "Awesome Job, Captain!";
    emoji = "🚀";
  } else if (percentage >= 50) {
    message = "Good Flying!";
    emoji = "🛸";
  } else {
    message = "Needs More Training!";
    emoji = "🔧";
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in text-center">
      <div className="bg-slate-800/80 backdrop-blur border border-slate-600 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-8xl mb-6 animate-bounce-small">{emoji}</div>
        
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">
          {message}
        </h2>
        
        <div className="text-slate-400 mb-8">
          Mission Report
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-700/50 rounded-xl p-4 flex flex-col items-center">
                <span className="text-3xl font-bold text-cyan-400">{stats.score}</span>
                <span className="text-xs text-slate-400 uppercase">Score</span>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 flex flex-col items-center">
                <span className={`text-3xl font-bold ${percentage >= 80 ? 'text-green-400' : 'text-orange-400'}`}>
                    {percentage}%
                </span>
                <span className="text-xs text-slate-400 uppercase">Accuracy</span>
            </div>
        </div>

        <div className="space-y-3">
            <Button onClick={onRestart} fullWidth variant="success" className="text-lg">
                Play Again ↺
            </Button>
            <Button onClick={onHome} fullWidth variant="primary" className="text-lg">
                Main Menu 🏠
            </Button>
        </div>
      </div>
    </div>
  );
};